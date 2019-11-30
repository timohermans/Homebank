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
    iconName: faker.random.word(),
    categoryGroup: { id: faker.random.uuid(), name: faker.random.word() },
  },
  {
    id: faker.random.uuid(),
    name: faker.random.word(),
    iconName: faker.random.word(),
    categoryGroup: { id: faker.random.uuid(), name: faker.random.word() },
  },
];

describe('TransactionCreateOrEditComponent', () => {
  let categoriesStore: BehaviorSubject<Category[]>;
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
    Object.defineProperty(categoryService, 'categories$', { get: () => categoriesStore });

    transactionService = new TransactionService(null) as jest.Mocked<TransactionService>;

    modalRef = new NgbModalRef(null, null, null, null) as jest.Mocked<NgbModalRef>;
    modalRef.result = new Promise(() => {});

    modalService = new NgbModal(null, null, null, null) as jest.Mocked<NgbModal>;
    modalService.open.mockReturnValue(modalRef);

    router = {
      navigate: jest.fn(),
    };

    activeRoute = {
      paramMap: of(convertToParamMap({ id: 'abc-def-ghi' })),
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

  it('Opens the page as a modal', () => {
    component.ngAfterViewInit();

    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(modalService.open).toHaveBeenCalled();
  });

  it('Retrieves categories automatically', () => {
    component.ngOnInit();
    expect(categoryService.loadCategories).toHaveBeenCalled();
    expect(component.categories$).toBeObservable(cold('a', { a: initialCategories }));
  });

  it('Navigates back to the overview when modal closes', () => {
    modalRef.result = Promise.resolve();
    component.ngAfterViewInit();

    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalled();
    }, 0);
  });

  it('Loads the form with existing transaction on init', () => {
    const existingTransaction = {
      id: 'abc-def-ghi',
      payee: faker.random.words(2),
      memo: faker.random.words(5),
      category: null,
    } as Transaction;

    transactionService.getForEditBy.mockReturnValue(of(existingTransaction));
    component.ngOnInit();

    expect(component.transactionForm.value).toEqual({
      id: existingTransaction.id,
      payee: existingTransaction.payee,
      memo: existingTransaction.memo,
      categoryId: null,
    });
  });

  it('Updates the selected category ID when selecting a category', () => {
    const categoryToSelect =
      initialCategories[faker.random.number({ max: initialCategories.length - 1 })];
    component.selectCategory(categoryToSelect.id);

    expect(component.transactionForm.get('categoryId').value).toBe(categoryToSelect.id);
    expect(component.selectedCategoryId).toBe(categoryToSelect.id);
  });

  it('Determines whether there are any categories yet', () => {
    categoriesStore.next([]);
    const expectedHasNoCategories = cold('a', { a: true });
    expect(component.hasNoCategories$).toBeObservable(expectedHasNoCategories);
  });

  describe('Assigning a category to a transaction', () => {
    const transactionChanges: TransactionUpdate = {
      id: faker.random.uuid(),
      memo: faker.random.words(10),
      payee: faker.random.words(2),
      categoryId: faker.random.uuid(),
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

  it('Can toggle between creating a category and assigning one', () => {
    component.toggleCreateCategory();
    expect(component.isCategoryCreationVisible).toBeTruthy();
  });

  it('Cannot update a transaction when creating a category', () => {
    component.isCategoryCreationVisible = true;
    component.transactionForm.get('categoryId').setValue(faker.random.number());
    transactionService.update.mockReturnValue(of({}));

    component.update();

    expect(transactionService.update).toHaveBeenCalledTimes(0);
  });

  it('Assigns the category automatically when its created', () => {
    const categoryCreated = {
      id: faker.random.uuid(),
      iconName: faker.random.word(),
      name: faker.random.word(),
    } as Category;

    component.isCategoryCreationVisible = true;
    component.handleCategoryCreated(categoryCreated);

    expect(component.isCategoryCreationVisible).toBeFalsy();
    expect(component.selectedCategoryId).toBe(categoryCreated.id);
    expect(component.transactionForm.get('categoryId').value).toBe(categoryCreated.id);
  });
});
