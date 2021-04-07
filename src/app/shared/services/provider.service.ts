import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { IProvider } from '../interfaces/IProvider';
import { IPaginated } from '../interfaces/IPaginated';
import { Observable } from 'rxjs';
import { PrepareHttpParams } from '../utils/query.util';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private baseUrl = environment.API + '/providers';

  constructor(private httpClient: HttpClient) { }

  findById(id: number) {
    return this.httpClient.get<IProvider>(`${this.baseUrl}/${id}`);
  }

  findAll(filter?: string): Observable<IPaginated<IProvider>> {
    return this.httpClient.get<IPaginated<IProvider>>(`${this.baseUrl}`, {
      params: PrepareHttpParams({ filter }),
    });
  }

  save(provider: IProvider) {
    return this.httpClient.post(`${this.baseUrl}`, provider);
  }

  update(id: number, provider: IProvider) {
    return this.httpClient.put(`${this.baseUrl}/${id}`, provider);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  findTop3() {
    return this.httpClient.get<IProvider[]>(`${this.baseUrl}/top3`);
  }
}
