import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPurchase } from '../interfaces/IPurchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  
  private baseUrl = environment.API + '/checkout/purchase';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: IPurchase): Observable<any> {
    return this.httpClient.post<IPurchase>(this.baseUrl, purchase);
  }
}
