import { CategoryCreateComponent } from './category-create.component';
import * as faker from 'faker';
import { CategoryService } from '../../services/category.service';
import { FormBuilder } from '@angular/forms';
import { CategoryIconService } from '../../services/category-icon.service';
jest.mock('../../services/category.service');
jest.mock('../../services/category-icon.service');

describe('CategoryCreateComponent', () => {
  let component: CategoryCreateComponent;
  let service: CategoryService;
  let categoryIconService: jest.Mocked<CategoryIconService>;

  beforeEach(() => {
    service = new CategoryService(null);
    categoryIconService = new CategoryIconService() as jest.Mocked<CategoryIconService>;

    component = new CategoryCreateComponent(service, new FormBuilder(), categoryIconService);
  });

  it('Saves the category when the fields are valid', () => {
    const componentToCreate = {
      name: faker.random.word(),
      icon: faker.random.word()
    };

    component.categoryForm.setValue(componentToCreate);

    component.save();

    expect(service.create).toHaveBeenCalledWith(componentToCreate);
  });

  it('can search for specific icons', () => {
    component.search('hallo');
    expect(categoryIconService.searchIcon).toHaveBeenCalledWith('hallo');
  });

  it('selects the chosen category', () => {
    component.selectIcon('hallo');

    expect(component.categoryForm.get('icon').value).toBe('hallo');
  });
});
