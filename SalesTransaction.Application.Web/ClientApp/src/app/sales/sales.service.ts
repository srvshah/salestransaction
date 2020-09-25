import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private api: WebApiService) { }

  getAllSales(): Observable<any>{
    return this.api.get('/sales/getallsales');

  }

  addSale(json: any): Observable<any>{
    return this.api.post('/sales/addsale', json);
  }

  updateSale(json: any): Observable<any>{
    return this.api.put('/sales/updatesale', json);
  }
}
