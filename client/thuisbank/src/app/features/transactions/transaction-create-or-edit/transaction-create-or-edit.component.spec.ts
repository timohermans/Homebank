import { TransactionCreateOrEditComponent } from './transaction-create-or-edit.component';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../categories/shared/services/category.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { Category } from '../../categories/shared/models/category.model';
import { cold } from 'jest-marbles';
jest.mock('@ng-bootstrap/ng-bootstrap');
jest.mock('../../categories/shared/services/category.service');
jest.mock('@angular/router');

describe('TransactionCreateOrEditComponent', () => {
  let categoriesStore: BehaviorSubject<Category[]>;
  let formBuilder: FormBuilder;
  let categoryService: jest.Mocked<CategoryService>;
  let modalService: jest.Mocked<NgbModal>;
  let modalRef: jest.Mocked<NgbModalRef>;
  let router: jest.Mocked<Router>;
  let component: TransactionCreateOrEditComponent;

  beforeEach(() => {
    formBuilder = new FormBuilder();

    categoriesStore = new BehaviorSubject<Category[]>([]);
    categoryService = new CategoryService(null) as jest.Mocked<CategoryService>;
    categoryService.getAll.mockReturnValue(categoriesStore);

    modalRef = new NgbModalRef(null, null, null, null) as jest.Mocked<NgbModalRef>;
    modalRef.result = new Promise(() => {});
    modalService = new NgbModal(null, null, null, null) as jest.Mocked<NgbModal>;
    modalService.open.mockReturnValue(modalRef);

    router = new Router(null, null, null, null, null, null, null, null) as jest.Mocked<Router>;
    component = new TransactionCreateOrEditComponent(
      formBuilder,
      categoryService,
      modalService,
      router
    );
  });

  describe('when loading the component', () => {
    beforeEach(() => {
      component.ngAfterViewInit();
    });

    it('has openend the modal', () => {
      expect(modalService.open).toHaveBeenCalled();
    });

    it('does not immidiately close', () => {
      expect(router.navigate).toHaveBeenCalledTimes(0);
    });
  });

  describe('when closing the modal', () => {
    beforeEach(() => {
      modalRef.result = Promise.resolve();
      component.ngAfterViewInit();
    });

    it('should navigate back to transactions', () => {
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('when receiving categories', () => {
    const categories: Category[] = [
      { id: 1, name: 'cat 1', categoryGroup: { id: 1, name: 'group 1' } },
      { id: 2, name: 'cat 2', categoryGroup: { id: 1, name: 'group 1' } },
      { id: 3, name: 'cat 3', categoryGroup: { id: 1, name: 'group 1' } },
      { id: 4, name: 'cat 4', categoryGroup: { id: 2, name: 'group 2' } },
      { id: 5, name: 'cat 5', categoryGroup: { id: 2, name: 'group 2' } },
      { id: 6, name: 'cat 6', categoryGroup: { id: 2, name: 'group 2' } }
    ];

    beforeEach(() => {
      categoriesStore.next(categories);
    });

    it('should group them by group', () => {
      const expected = cold('a', {
        a: [
          {
            groupName: 'group 1',
            categories: [
              { id: 1, name: 'cat 1', categoryGroup: { id: 1, name: 'group 1' } },
              { id: 2, name: 'cat 2', categoryGroup: { id: 1, name: 'group 1' } },
              { id: 3, name: 'cat 3', categoryGroup: { id: 1, name: 'group 1' } }
            ]
          },
          {
            groupName: 'group 2',
            categories: [
              { id: 4, name: 'cat 4', categoryGroup: { id: 2, name: 'group 2' } },
              { id: 5, name: 'cat 5', categoryGroup: { id: 2, name: 'group 2' } },
              { id: 6, name: 'cat 6', categoryGroup: { id: 2, name: 'group 2' } }
            ]
          }
        ]
      });

      expect(component.categories$).toBeObservable(expected);
    });
  });
});
