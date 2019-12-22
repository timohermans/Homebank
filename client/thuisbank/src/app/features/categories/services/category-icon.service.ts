import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { categoryIcons } from '../models/category-icon.model';
import * as _ from 'lodash';
import * as fuzzy from 'fuzzysort';

@Injectable({
  providedIn: 'root'
})
export class CategoryIconService {
  private categoryIcons = new BehaviorSubject<string[]>(categoryIcons);

  public get categoryIcons$(): Observable<string[]> {
    return this.categoryIcons.asObservable();
  }

  constructor() {}

  public searchIcon(searchTerm: string): void {
    if (_.isEmpty(searchTerm)) {
      this.categoryIcons.next(categoryIcons);
      return;
    }

    fuzzy.goAsync(searchTerm, [...categoryIcons]).then((result: Fuzzysort.Results) => {
      this.categoryIcons.next(result.map(r => r.target));
    });
  }

  public resetSearch(): void {
    this.categoryIcons.next(categoryIcons);
  }
}
