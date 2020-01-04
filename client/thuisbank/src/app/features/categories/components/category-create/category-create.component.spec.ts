import { CategoryCreateComponent } from './category-create.component';
import * as faker from 'faker';
import { CategoryService } from '../../services/category.service';
import { FormBuilder } from '@angular/forms';
import { CategoryIconService } from '../../services/category-icon.service';
import { Category } from '../../models/category.model';
jest.mock('../../services/category.service');
jest.mock('../../services/category-icon.service');

describe('CategoryCreateComponent', () => {
  let component: CategoryCreateComponent;
  let service: CategoryService;
  let categoryIconService: jest.Mocked<CategoryIconService>;

  beforeEach(() => {
    service = new CategoryService(null, null);
    categoryIconService = new CategoryIconService() as jest.Mocked<CategoryIconService>;

    component = new CategoryCreateComponent(null, service, new FormBuilder(), categoryIconService);
  });

  it('can search for specific icons', () => {
    component.search('hallo');
    expect(categoryIconService.searchIcon).toHaveBeenCalledWith('hallo');
  });

  it('selects the chosen category', () => {
    component.selectIcon('hallo');

    expect(component.categoryForm.get('icon').value).toBe('hallo');
  });

  it('emits the category that needs to be created when form is valid', done => {
    const expectedCategory = new Category(null, 'Food', 'apple');

    component.ngOnInit();
    component.registerOnChange((category: Category) => {
      expect(category).toEqual(expectedCategory);
      done();
    });

    component.categoryForm.setValue({
      id: null,
      name: 'Food',
      icon: 'apple'
    });
  });

  it('emits null when the form is not valid', () => {
    const onChangeFn = jest.fn();
    component.registerOnChange(onChangeFn);
    component.ngOnInit();

    component.categoryForm.setValue({
      name: null,
      icon: 'apple',
      id: null
    });

    expect(onChangeFn).toHaveBeenCalledWith(null);
  });

  it('can receive a whole category object and sets it in the form', () => {
    const expectedValue = {
      id: 'abc-def',
      name: 'Food',
      icon: 'apple'
    };
    const categoryToPass = Category.fromForm(expectedValue);

    component.writeValue(categoryToPass);

    expect(component.categoryForm.value).toEqual(expectedValue);
  });

  it('does not break when nothing is passed to the component', () => {
    expect(() => {
      component.writeValue(null);
    }).not.toThrowError();
  });

  it('resets the category search on each open', () => {
    component.ngOnInit();

    expect(categoryIconService.resetSearch).toHaveBeenCalled();
  })
});
