import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = environment.apiUrl + '/account/login'
  headers = new HttpHeaders()

  constructor(
    private http: HttpClient

  ) { 
  }
 
  getLogin(json): Observable<any>{
    
    return this.http.post(this.loginUrl, json)
  }
}
