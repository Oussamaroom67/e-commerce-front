import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../shared/interfaces/product';
import { Router, RouterLink,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product!:Product;
  id!:string|null;
  loading:boolean=false;
  constructor(private productService:ProductService,private route: ActivatedRoute){
      this.id=this.route.snapshot.paramMap.get('id'); 
  }
  ngOnInit(): void {
    this.loading=true;
    this.productService.getProductById(Number(this.id)).subscribe(p=>{
      this.product=p;
      this.loading=false;
    })
  }

}
