import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map, tap} from 'rxjs/operators';
import {ApolloQueryResult} from 'apollo-client';
import {Category, CategoryQueryResult} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesQuery = gql`
    query FetchCategories {
      categories {
        id
        name
        categoryGroup {
          id
          name
        }
      }
    }
  `;

  constructor(private apollo: Apollo) {
  }

  public getAll(): Observable<Category[]> {
    return this.apollo.watchQuery({
      query: this.categoriesQuery
    })
      .valueChanges.pipe(
        tap((cat) => console.log(cat)),
        map((result: ApolloQueryResult<CategoryQueryResult>) => result.data.categories)
      );
  }
}
