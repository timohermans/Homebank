import { TransactionCreateOrEditComponent } from './transaction-create-or-edit.component';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../categories/shared/services/category.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { Category } from '../../categories/shared/models/category.model';
import { cold } from 'jest-marbles';
import * as faker from 'faker';
import { TransactionService } from '../shared/services/transaction.service';
import { TransactionUpdate } from '../shared/entities/transaction.model';
jest.mock('@ng-bootstrap/ng-bootstrap');
jest.mock('../../categories/shared/services/category.service');
jest.mock('../shared/services/transaction.service');
jest.mock('@angular/router');

describe('TransactionCreateOrEditComponent', () => {
  let categoriesStore: BehaviorSubject<Category[]>;
  let transactionIdStore: ReplaySubject<ParamMap>;
  let formBuilder: FormBuilder;
  let transactionService: jest.Mocked<TransactionService>;
  let categoryService: jest.Mocked<CategoryService>;
  let modalService: jest.Mocked<NgbModal>;
  let modalRef: jest.Mocked<NgbModalRef>;
  let router: jest.Mocked<Router>;
  let activeRoute: jest.Mocked<ActivatedRoute>;
  let component: TransactionCreateOrEditComponent;

  beforeEach(() => {
    formBuilder = new FormBuilder();

    categoriesStore = new BehaviorSubject<Category[]>([]);
    categoryService = new CategoryService(null) as jest.Mocked<CategoryService>;
    categoryService.getAll.mockReturnValue(categoriesStore);

    transactionService = new TransactionService(null) as jest.Mocked<TransactionService>;

    modalRef = new NgbModalRef(null, null, null, null) as jest.Mocked<NgbModalRef>;
    modalRef.result = new Promise(() => {});

    modalService = new NgbModal(null, null, null, null) as jest.Mocked<NgbModal>;
    modalService.open.mockReturnValue(modalRef);

    router = new Router(null, null, null, null, null, null, null, null) as jest.Mocked<Router>;

    transactionIdStore = new ReplaySubject(1);
    activeRoute = new ActivatedRoute() as jest.Mocked<ActivatedRoute>;
    (activeRoute.paramMap as any) = transactionIdStore;

    component = new TransactionCreateOrEditComponent(
      formBuilder,
      categoryService,
      transactionService,
      modalService,
      router,
      activeRoute
    );
  });

  describe('Loading the component', () => {
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

  describe('Closing the modal', () => {
    beforeEach(() => {
      modalRef.result = Promise.resolve();
      component.ngAfterViewInit();
    });

    it('should navigate back to transactions', () => {
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('Receiving available categories', () => {
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

  describe('Editing an existing transaction', () => {
    beforeEach(() => {
      transactionIdStore.next(convertToParamMap({ id: 'abc-def-ghi' }));
      transactionService.getForEditBy.mockReturnValue(
        of({
          // TODO: fill it up and test if the form is set
        })
      );
    });
  });

  describe('Assigning a category to a transaction', () => {
    const transactionChanges: TransactionUpdate = {
      id: faker.random.uuid(),
      memo: faker.random.words(10),
      payee: faker.random.words(2),
      categoryId: faker.random.uuid()
    };

    beforeEach(() => {
      component.ngAfterViewInit();
      transactionService.update.mockReturnValue(of({}));
      component.transactionForm.setValue(transactionChanges);
      component.update();
    });

    it('Successfully saves the transaction', () => {
      expect(transactionService.update).toHaveBeenCalledWith(transactionChanges);
    });

    it('Closes the modal', () => {
      expect(component.modal.close).toHaveBeenCalled();
    });

    it('goes back to the transaction page', () => {
      expect(router.navigate).toHaveBeenCalled();
    });

    // it('Shows a message', () => {
    //   expect(toastr.succes).toHaveBeenCalledWith('transaction-create-edit.success');
    // });
  });
});
