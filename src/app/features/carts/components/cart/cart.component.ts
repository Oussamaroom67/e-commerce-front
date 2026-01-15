import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../shared/interfaces/cart-item';
import { ToastService } from '../../../../shared/services/toast.service';
import { ToastType } from '../../../../shared/enums/toast-types';
import { ApiService } from '../../../../core/services/api.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems:CartItem[]=[];
  sizeCart:number=0;
  totalPrice:number=0;
  constructor(private cartService:CartService,private toastService:ToastService,private apiService:ApiService){}
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart(){
      this.cartItems=this.cartService.getCart();
      this.sizeCart=this.cartService.size();
      this.totalPriceCalculate();
  }
  deleteProductFromCart(item:CartItem){
    this.cartService.delete(item)
    this.loadCart();
    this.toastService.show({
      type:ToastType.Success,
      message:`The item white id ${item.product.id} was deleted from cart`
    })
  }
  clearCart(){
    this.cartService.clear();
    this.loadCart();

    this.toastService.show({
      type:ToastType.Success,
      message:'Cart cleard'
    })
  }
  totalPriceCalculate(){
    this.totalPrice=this.cartItems.reduce((sum,item) => sum + item.product.price*item.quantity, 0);
  }
  updateQuantity(event:Event,index:number){
    this.cartItems[index].quantity=Number((event.target as HTMLInputElement).value);
    this.cartService.add(this.cartItems[index]);
    this.totalPriceCalculate();
  }
  increaseQuantity(index:number){
    this.cartItems[index].quantity++;
    this.cartService.add(this.cartItems[index]);
    this.totalPriceCalculate();
  }
  decreaseQuantity(index:number){
    this.cartItems[index].quantity--;
    this.cartService.add(this.cartItems[index]);
    this.totalPriceCalculate();
  }
  submitCard(){
    const cart:Cart={
      id:1,
      userId:3,
      products:this.cartItems.map(item=>({
        productId:item.product.id,
        quantity:item.quantity
      }))
    }
    this.apiService.add('carts',cart).subscribe({
      next: (data)=>{
        this.toastService.show({
          type:ToastType.Success,
          message:`Cart submitted successfully with id ${data.id}`
        })
        this.clearCart()
      },
      error: (err)=>{
        this.toastService.show({
          type:ToastType.Error,
          message:`There was an error submitting the cart: ${err.message}`
        });
      }
    }
    )
  }
}
 