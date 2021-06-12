import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPaginated } from '../interfaces/IPaginated';
import { Observable } from 'rxjs';
import { OrderHistory } from '../interfaces/OrderHistory';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.API + '/orders';

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string): Observable<IPaginated<OrderHistory>> {
    const orderHistoryUrl = `${this.baseUrl}/customer/${theEmail}`;
    return this.httpClient.get<IPaginated<OrderHistory>>(orderHistoryUrl);
  }
}

