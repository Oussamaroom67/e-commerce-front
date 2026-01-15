import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ToastType } from '../../../../shared/enums/toast-types';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../shared/interfaces/cart-item';
import { cartState } from '../../../../shared/enums/cart-states';
import { ToastMessages } from '../../constants/toast-messages';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit{
  //data
  productsData: Product[] = [];
  categories=signal<string[]>([]);
  filtredProducts:Product[]=[];
  cartsProducts:Product[]=[];
  loading=false;
  //constructor
  constructor(private productService: ProductService,private toast:ToastService,private cartService :CartService){}
  ngOnInit(): void {
   this.getAllProducts();
   console.log(this.categories)
  }
  //logics
  getAllProducts(){
      this.loading=true;
       this.productService.getAllProducts().subscribe((data: Product[]) => {
        this.productsData = data;
        this.loading=false;
        this.filtredProducts=this.productsData;
        this.categories.set([
          ...new Set(this.productsData.map(p => p.category))
        ]);
      });
  }
  getByCategory(event:any){
    let category=event.target.value;
    if(category==='all')
      this.filtredProducts=this.productsData;
    else
      this.filtredProducts=this.productsData.filter((data)=>data.category===category);
      
  }

  addProductToLocalStorage(cartItem:CartItem){
    const result=this.cartService.add(cartItem);
   switch (result) {
      case cartState.Added:
        this.toast.show({
          message: ToastMessages.Added,
          type: ToastType.Success,
          duration: 3000
        });
        break;

      case cartState.AlreadyExists:
        this.toast.show({
          message:ToastMessages.AlreadyExists,
          type: ToastType.Warning,
          duration: 3000
        });
        break;

      case cartState.QuantityUpdated:
        this.toast.show({
          message: ToastMessages.QuantityUpdated,
          type: ToastType.Info,
          duration: 3000
        });
        break;

      default:
        this.toast.show({
          message: 'Action non reconnue',
          type: ToastType.Error,
          duration: 3000
        });
    }

  }
      
}
