import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/ICategory';
import { IPaginated } from '../interfaces/IPaginated';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = environment.API + '/categories';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<IPaginated<ICategory>> {
    return this.httpClient.get<IPaginated<ICategory>>(`${this.baseUrl}`);
  }
}
