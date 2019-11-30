import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryStore = new BehaviorSubject<Category[]>([]);

  public get categories$(): Observable<Category[]> {
    return this.categoryStore.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  public loadCategories(): void {
    this.httpClient
      .get<Category[]>(`${environment.apiUrl}/category`)
      .subscribe((categories: Category[]) => {
        this.categoryStore.next(categories);
      });
  }

  public create(category: Category): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/category`, category);
  }
}
