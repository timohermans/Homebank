import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, tap } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import { Category, CategoryQueryResult } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/category`);
  }
}
