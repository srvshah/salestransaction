import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private api: WebApiService) { }

  getAllInvoice(): Observable<any>{
    return this.api.get('/invoice/getallinvoice');
  }

  generateInvoice(json: any): Observable<any>{
    return this.api.post('/invoice/generateinvoice', json);
  }

  getInvoiceDetail(json: any): Observable<any> {
    return this.api.get('/invoice/getinvoicedetail', new HttpParams().set('invoiceId', JSON.stringify(json)));
  }
}
