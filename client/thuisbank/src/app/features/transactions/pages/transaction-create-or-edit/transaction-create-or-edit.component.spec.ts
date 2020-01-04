import {TransactionCreateOrEditComponent} from './transaction-create-or-edit.component';
import {FormBuilder} from '@angular/forms';
import {CategoryService} from '../../../categories/services/category.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {Category} from '../../../categories/models/category.model';
import {cold} from 'jest-marbles';
import * as faker from 'faker';
import {TransactionService} from '../../services/transaction.service';
import {Transaction, TransactionUpdate} from '../../entities/transaction.model';
import {IsLoadingService} from '@service-work/is-loading';

jest.mock('@ng-bootstrap/ng-bootstrap');
jest.mock('../../../categories/services/category.service');
jest.mock('../../services/transaction.service');
jest.mock('@service-work/is-loading');

const initialCategories: Category[] = [
  new Category(faker.random.uuid(), faker.random.word(), faker.random.word()),
  new Category(faker.random.uuid(), faker.random.word(), faker.random.word())
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
  let loadingService: jest.Mocked<IsLoadingService>;

  beforeEach(() => {
    formBuilder = new FormBuilder();

    categoriesStore = new BehaviorSubject<Category[]>(initialCategories);
    categoryService = new CategoryService(null, null) as jest.Mocked<CategoryService>;
    Object.defineProperty(categoryService, 'categories$', {get: () => categoriesStore});

    transactionService = new TransactionService(null, null) as jest.Mocked<TransactionService>;

    modalRef = new NgbModalRef(null, null, null, null) as jest.Mocked<NgbModalRef>;
    modalRef.result = new Promise(() => {
    });

    modalService = new NgbModal(null, null, null, null) as jest.Mocked<NgbModal>;
    modalService.open.mockReturnValue(modalRef);

    router = {
      navigate: jest.fn()
    };

    activeRoute = {
      paramMap: of(convertToParamMap({id: 'abc-def-ghi'}))
    };

    loadingService = new IsLoadingService() as jest.Mocked<IsLoadingService>;
    // loadingService.add.mockImplementation((first: Subscription | Observable<any>) => {
    //   if (first instanceof Subscription) {
    //     if (first.closed) return first;
    //
    //     sub = first;
    //
    //     first.add(() => this.remove(first));
    //   }
    //
    // });

    component = new TransactionCreateOrEditComponent(
      formBuilder,
      categoryService,
      transactionService,
      modalService,
      router as any,
      activeRoute as any,
      loadingService
    );
  });

  it('Opens the page as a modal', () => {
    component.ngAfterViewInit();

    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(modalService.open).toHaveBeenCalled();
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
      category: null
    } as Transaction;

    transactionService.getForEditBy.mockReturnValue(of(existingTransaction));
    component.ngOnInit();

    expect(component.transactionForm.value).toEqual({
      id: existingTransaction.id,
      category: null
    });
  });

  it('Updates the selected category when selecting a category', () => {
    const categoryToSelect =
      initialCategories[faker.random.number({max: initialCategories.length - 1})];
    component.selectCategory(categoryToSelect);

    expect(component.transactionForm.get('category').value).toBe(categoryToSelect);
    expect(component.selectedCategory).toBe(categoryToSelect);
  });

  it('Determines whether there are any categories yet', () => {
    categoriesStore.next([]);
    const expectedHasNoCategories = cold('a', {a: true});
    expect(component.hasNoCategories$).toBeObservable(expectedHasNoCategories);
  });

  describe('Assigning a category to a transaction', () => {
    const transactionChanges: any = {
      id: faker.random.uuid(),
      category: new Category(faker.random.uuid(), faker.random.word(), faker.random.word())
    };

    beforeEach(() => {
      component.ngAfterViewInit();
      transactionService.update.mockReturnValue(of({}));
      component.transactionForm.setValue(transactionChanges);
      component.update();
    });

    it('Successfully saves the transaction', () => {
      expect(transactionService.update).toHaveBeenCalledWith({
        id: transactionChanges.id,
        categoryId: transactionChanges.category.id
      } as TransactionUpdate);
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
    component.transactionForm
      .get('category')
      .setValue(new Category(faker.random.uuid(), faker.random.word(), faker.random.word()));
    transactionService.update.mockReturnValue(of({}));

    component.update();

    expect(transactionService.update).toHaveBeenCalledTimes(0);
  });

  it('Assigns the category automatically when its created', () => {
    const categoryCreated = new Category(
      faker.random.uuid(),
      faker.random.word(),
      faker.random.word()
    );

    component.isCategoryCreationVisible = true;
    component.handleCategoryCreated(categoryCreated);

    expect(component.isCategoryCreationVisible).toBeFalsy();
    expect(component.selectedCategory).toBe(categoryCreated);
    expect(component.transactionForm.get('category').value).toBe(categoryCreated);
  });

  it('displays create as button text when in create category mode', () => {
    component.toggleCreateCategory();

    expect(component.saveButtonText).toEqual('transactionCreateOrEdit.createCategoryButton');

    component.toggleCreateCategory();

    expect(component.saveButtonText).toEqual('transactionCreateOrEdit.saveTransactionButton');
  });

  it('toggles the category creation when the form is done and does not close the modal', () => {
    // arrange
    categoryService.create.mockReturnValue(of(null as Category));
    component.transactionForm.setValue({
      id: faker.random.uuid(),
      category: new Category(null, null, null)
    });
    component.modal = {close: jest.fn()} as any;

    // act
    component.toggleCreateCategory();

    component.transactionForm.get('category').setValue({
      id: null,
      name: faker.random.word(),
      icon: faker.random.word()
    });

    component.handleSave();

    // assert
    expect(component.isCategoryCreationVisible).toBeFalsy();
    expect(component.saveButtonText).toBe('transactionCreateOrEdit.saveTransactionButton');
  });

  it('does not close the modal when creating a category', () => {
    jest.resetAllMocks();
    component.modal = {close: jest.fn()} as any;
    component.toggleCreateCategory();

    component.handleSave();

    expect(component.modal.close).not.toHaveBeenCalled();
  });

  it('sets the created category as selected when valid', () => {
    const categoryToCreate = new Category(null, faker.random.word(), faker.random.word());
    component.modal = {
      close: () => {
      }
    } as any;
    component.toggleCreateCategory();
    component.transactionForm.get('category').setValue(categoryToCreate);

    component.handleSave();

    expect(component.selectedCategory).toEqual(categoryToCreate);
  });

  it('creates the category when it is not created yet before saving the transaction', () => {
    component.ngAfterViewInit();
    const categoryToCreate = new Category(null, faker.random.word(), faker.random.word());
    component.transactionForm.setValue({
      id: faker.random.uuid(),
      category: categoryToCreate
    });

    categoryService.create.mockReturnValue(of(new Category(null, null, null)));

    component.handleSave();

    expect(categoryService.create).toBeCalledWith(categoryToCreate);
    expect(categoryService.loadCategories).toHaveBeenCalled();
  });

  it('updates the transaction after the new category has been created', () => {
    component.ngAfterViewInit();
    const category = new Category(null, faker.random.word(), faker.random.word());
    component.transactionForm.setValue({
      id: faker.random.uuid(),
      category: category
    });

    categoryService.create.mockImplementation((categoryMock: Category) => {
      const categoryId = faker.random.uuid();
      category.id = categoryId;
      categoryMock.id = categoryId;
      return of(categoryMock);
    });

    component.handleSave();

    expect(transactionService.update).toHaveBeenCalledWith({
      id: component.transactionForm.value.id,
      categoryId: category.id
    } as TransactionUpdate);
  });

  it('does not create a category when it is already created before assigning the transaction', () => {
    component.ngAfterViewInit();
    const category = new Category(faker.random.uuid(), faker.random.word(), faker.random.word());
    component.transactionForm.setValue({
      id: faker.random.uuid(),
      category: category
    });

    component.handleSave();

    expect(categoryService.create).not.toHaveBeenCalled();
    expect(transactionService.update).toHaveBeenCalledWith({
      id: component.transactionForm.value.id,
      categoryId: category.id
    } as TransactionUpdate);
  });

  it('it does not create or update anything when the transaction is not valid', () => {
    component.handleSave();

    expect(categoryService.create).not.toHaveBeenCalled();
    expect(transactionService.update).not.toHaveBeenCalled();
  });

  it('does not close the window when the transaction updating is not finished yet', () => {
    component.ngAfterViewInit();
    const category = new Category(faker.random.uuid(), faker.random.word(), faker.random.word());
    component.transactionForm.setValue({
      id: faker.random.uuid(),
      category: category
    });

    component.handleSave();

    expect(modalRef.close).not.toHaveBeenCalled();
  });

  it('updates the transaction list when the transaction is successfully updated', () => {
    component.ngAfterViewInit();
    const category = new Category(faker.random.uuid(), faker.random.word(), faker.random.word());
    component.transactionForm.setValue({
      id: faker.random.uuid(),
      category: category
    });

    transactionService.update.mockReturnValue(of(null));

    component.handleSave();

    expect(transactionService.loadTransactions).toHaveBeenCalled();
  });

  it('closes the window after the transaction is successfully updated', () => {
    component.ngAfterViewInit();
    const category = new Category(faker.random.uuid(), faker.random.word(), faker.random.word());
    component.transactionForm.setValue({
      id: faker.random.uuid(),
      category: category
    });

    transactionService.update.mockReturnValue(of(null));

    component.handleSave();

    expect(modalRef.close).toHaveBeenCalled();
  });

  it('unselects any selected category when creating a new category', () => {
    // arrange
    component.transactionForm.get('category').setValue(new Category(faker.random.uuid(), faker.random.word(), faker.random.word()));

    // act
    component.toggleCreateCategory();

    // asset
    expect(component.transactionForm.get('category').value).toBeNull();
  });
});
