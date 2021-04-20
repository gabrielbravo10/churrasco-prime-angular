import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { IPaginated } from '../interfaces/IPaginated';
import { Observable } from 'rxjs';
import { PrepareHttpParams } from '../utils/query.util';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.API + '/products';

  constructor(private httpClient: HttpClient) { }

  findById(id: number) {
    return this.httpClient.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  findAll(filter?: string): Observable<IPaginated<IProduct>> {
    return this.httpClient.get<IPaginated<IProduct>>(`${this.baseUrl}`, {
      params: PrepareHttpParams({ filter }),
    });
  }

  save(product: IProduct) {
    return this.httpClient.post(`${this.baseUrl}`, product);
  }

  update(id: number, product: IProduct) {
    return this.httpClient.put(`${this.baseUrl}/${id}`, product);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  findProductsByProviderAndCategory(providerId: number, categories?: string,
    filter?: string): Observable<IPaginated<IProduct>> {
    return this.httpClient.get<IPaginated<IProduct>>(`${this.baseUrl}/provider/${providerId}`, {
      params: PrepareHttpParams({ categories, filter }),
    });
  }
}
