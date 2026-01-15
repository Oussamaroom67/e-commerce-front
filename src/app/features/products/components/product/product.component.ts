import { Component, Output, EventEmitter, signal } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { CartItem } from '../../../../shared/interfaces/cart-item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
@Input ({required:true}) product!:Product;
@Output () addToCart=new EventEmitter<CartItem>();
quantity:number=1;
showAdd:boolean=true;


notifyAddTocart(product:Product){
  this.addToCart.emit({product, quantity: this.quantity});
  this.showAdd=true;
}
decreaseQuantity(){
  this.quantity-=1;
}
increaseQuantity(){
  this.quantity+=1;
}

}
