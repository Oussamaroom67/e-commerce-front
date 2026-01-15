import { Injectable } from '@angular/core';
import { CartItem } from '../../shared/interfaces/cart-item';
import { cartState } from '../../shared/enums/cart-states';
@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  private readonly cartKey='cart';
  constructor() { }
  //get cart
    getCart(): CartItem[] {
    return JSON.parse(
      localStorage.getItem(this.cartKey) || '[]'
    );
  }
  //add to cart
  add(item:CartItem){
    let cart=this.getCart();
    let existingItem=cart.find(product=>product.product.id===item.product.id);
    if(existingItem){
      if(existingItem.quantity===item.quantity)
        return cartState.AlreadyExists
      
      existingItem.quantity=item.quantity;
      localStorage.setItem(this.cartKey,JSON.stringify(cart))
      return cartState.QuantityUpdated;
    }
    cart.push(item);
    localStorage.setItem(this.cartKey,JSON.stringify(cart))
    return cartState.Added;
  }
  // count 
  size(){
    return this.getCart().length;
  }
  clear(){
    localStorage.removeItem(this.cartKey);
  }
  delete(item:CartItem){
    let cart:CartItem[]=this.getCart();
    cart =cart.filter(element=>element.product.id!==item.product.id)
    localStorage.setItem(this.cartKey,JSON.stringify(cart))
  }

}
