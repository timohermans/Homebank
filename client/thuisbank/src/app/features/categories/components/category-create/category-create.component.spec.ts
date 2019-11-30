import { CategoryCreateComponent } from './category-create.component';
import * as faker from 'faker';
import { CategoryService } from '../../services/category.service';
import { FormBuilder } from '@angular/forms';
jest.mock('../../services/category.service');

describe('CategoryCreateComponent', () => {
  let component: CategoryCreateComponent;
  let service: CategoryService;

  beforeEach(() => {
    service = new CategoryService(null);

    component = new CategoryCreateComponent(service, new FormBuilder());
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
});
