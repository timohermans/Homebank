import { TransactionCreateOrEditComponent } from './transaction-create-or-edit.component';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../categories/services/category.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { Category } from '../../../categories/models/category.model';
import { cold } from 'jest-marbles';
import * as faker from 'faker';
import { TransactionService } from '../../services/transaction.service';
import { TransactionUpdate, Transaction } from '../../entities/transaction.model';

jest.mock('@ng-bootstrap/ng-bootstrap');
jest.mock('../../../categories/services/category.service');
jest.mock('../../services/transaction.service');

const initialCategories: Category[] = [
  {
    id: faker.random.uuid(),
    name: faker.random.word(),
    categoryGroup: { id: faker.random.uuid(), name: faker.random.word() }
  },
  {
    id: faker.random.uuid(),
    name: faker.random.word(),
    categoryGroup: { id: faker.random.uuid(), name: faker.random.word() }
  }
];

describe('TransactionCreateOrEditComponent', () => {
  let categoriesStore: BehaviorSubject<Category[]>;
  let paramMapStore: BehaviorSubject<ParamMap>;
  let formBuilder: FormBuilder;
  let transactionService: jest.Mocked<TransactionService>;
  let categoryService: jest.Mocked<CategoryService>;
  let modalService: jest.Mocked<NgbModal>;
  let modalRef: jest.Mocked<NgbModalRef>;
  let router: jest.Mocked<Partial<Router>>;
  let activeRoute: Partial<ActivatedRoute>;
  let component: TransactionCreateOrEditComponent;

  beforeEach(() => {
    formBuilder = new FormBuilder();

    categoriesStore = new BehaviorSubject<Category[]>(initialCategories);
    categoryService = new CategoryService(null) as jest.Mocked<CategoryService>;
    categoryService.getAll.mockReturnValue(categoriesStore);

    transactionService = new TransactionService(null) as jest.Mocked<TransactionService>;

    modalRef = new NgbModalRef(null, null, null, null) as jest.Mocked<NgbModalRef>;
    modalRef.result = new Promise(() => {});

    modalService = new NgbModal(null, null, null, null) as jest.Mocked<NgbModal>;
    modalService.open.mockReturnValue(modalRef);

    router = {
      navigate: jest.fn()
    };

    activeRoute = {
      paramMap: of(convertToParamMap({ id: 'abc-def-ghi' }))
    };

    component = new TransactionCreateOrEditComponent(
      formBuilder,
      categoryService,
      transactionService,
      modalService,
      router as any,
      activeRoute as any
    );
  });

  describe('Loading the component', () => {
    beforeEach(() => {
      component.ngAfterViewInit();
    });

    it('Opens the page as a modal', () => {
      expect(modalService.open).toHaveBeenCalled();
    });

    it('Does not close the modal immediately', () => {
      expect(router.navigate).toHaveBeenCalledTimes(0);
    });

    it('Retrieves categories for assigning', () => {
      expect(component.categories$).toBeObservable(cold('a', { a: initialCategories }));
    });
  });

  describe('Closing the modal', () => {
    beforeEach(() => {
      modalRef.result = Promise.resolve();
      component.ngAfterViewInit();
    });

    it('Navigates back to the transaction overview page', () => {
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('Editing an existing transaction', () => {
    const existingTransaction = {
      id: 'abc-def-ghi',
      payee: faker.random.words(2),
      memo: faker.random.words(5),
      category: null
    } as Transaction;

    beforeEach(() => {
      transactionService.getForEditBy.mockReturnValue(of(existingTransaction));
      component.ngOnInit();
    });

    it('Sets up the form with existing values', () => {
      expect(component.transactionForm.value).toEqual({
        id: existingTransaction.id,
        payee: existingTransaction.payee,
        memo: existingTransaction.memo,
        categoryId: null
      });
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

    it('Goes back to the transaction page', () => {
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
