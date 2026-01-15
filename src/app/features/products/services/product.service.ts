import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { API_ENDPOINTS } from '../../../shared/constants/API_ENDPOINTS';
import { Product } from '../../../shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly endpoint = API_ENDPOINTS.products;
  constructor(private apiService: ApiService) { }
  
  getAllProducts() {
    return this.apiService.get<Product[]>(this.endpoint);
  }
  getProductById(id: number) {
    return this.apiService.getById<Product>(this.endpoint, id);
  }
  updateProduct(id:number, data:Product){
    return this.apiService.update<Product>(this.endpoint, id, data);
  }
  addProduct(data:Product){
    return this.apiService.add<Product>(this.endpoint, data);
  }
  deleteProduct(id:number){
    return this.apiService.delete<Product>(this.endpoint, id);
  }

}
