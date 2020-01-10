import { CategoryService } from './category.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import * as faker from 'faker';
import { of } from 'rxjs';
import { cold } from 'jest-marbles';
import { environment } from 'src/environments/environment';
import {IsLoadingService} from '@service-work/is-loading';

jest.mock('@angular/common/http');
jest.mock('@service-work/is-loading');

describe('CategoryService', () => {
  let service: CategoryService;
  let httpClient: jest.Mocked<HttpClient>;
  let loadingService: jest.Mocked<IsLoadingService>;

  beforeEach(() => {
    httpClient = new HttpClient(null) as jest.Mocked<HttpClient>;
    loadingService = new IsLoadingService() as jest.Mocked<IsLoadingService>;

    service = new CategoryService(httpClient, loadingService);
  });

  it('Loads the fetched categories from the API and stores them', () => {
    const categoriesFromApi: Category[] = [];

    for (let index = 0; index < faker.random.number(20); index++) {
      categoriesFromApi.push(
        new Category(faker.random.uuid(), faker.random.word(), faker.random.word())
      );
    }

    httpClient.get.mockReturnValue(of(categoriesFromApi));

    service.loadCategories();

    const expectedCategoriesStored = cold('a', { a: categoriesFromApi });

    expect(service.categories$).toBeObservable(expectedCategoriesStored);
  });

  it('Creates a category by sending it to the API', () => {
    const categoryToCreate: Category = new Category(
      faker.random.uuid(),
      faker.random.word(),
      faker.random.word()
    );

    httpClient.post.mockReturnValue(of({}));

    service.create(categoryToCreate);

    expect(httpClient.post).toBeCalledWith(`${environment.apiUrl}/category`, categoryToCreate);
  });
});
