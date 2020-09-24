import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: WebApiService) {
  }

  getAllProducts(): Observable<any>{
    return this.api.get('/product/allproducts');
  }

  addProduct(json: any): Observable<any>{
    return this.api.post('/product/addproduct', json);
  }

  updateProduct(json: any): Observable<any>{
    return this.api.put('/product/updateproduct', json);
  }
}
