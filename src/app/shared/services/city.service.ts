import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPaginated } from '../interfaces/IPaginated';
import { Observable } from 'rxjs';
import { ICity } from '../interfaces/ICity';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl = environment.API + '/cities';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<IPaginated<ICity>> {
    return this.httpClient.get<IPaginated<ICity>>(`${this.baseUrl}`);
  }
}
