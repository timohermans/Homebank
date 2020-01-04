import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {Category} from '../models/category.model';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IsLoadingService} from '@service-work/is-loading';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryStore = new BehaviorSubject<Category[]>([]);

  public get categories$(): Observable<Category[]> {
    return this.categoryStore.asObservable();
  }

  constructor(private httpClient: HttpClient, private loadingService: IsLoadingService) {
  }

  public loadCategories(): void {
    this.loadingService.add(
      this.httpClient
      .get<Category[]>(`${environment.apiUrl}/category`)
      .pipe(
        map((categories: Category[]) => Category.fromJsonArray(categories))
      )
      .subscribe((categories: Category[]) => {
        this.categoryStore.next(categories);
      }), {key: 'categories'});
  }

  public create(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${environment.apiUrl}/category`, category);
  }
}
