import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CategoryService} from '../../../categories/services/category.service';
import {Category} from '../../../categories/models/category.model';
import * as _ from 'lodash';
import {filter, map, mergeMap, switchMap, takeUntil, tap, shareReplay} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';
import {TransactionService} from '../../services/transaction.service';
import {Transaction, TransactionUpdate} from '../../entities/transaction.model';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {IsLoadingService} from '@service-work/is-loading';

@Component({
  selector: 'app-transaction-create-or-edit',
  templateUrl: './transaction-create-or-edit.component.html',
  styleUrls: ['./transaction-create-or-edit.component.scss']
})
export class TransactionCreateOrEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content', {static: false}) modalContent: any;
  private readonly saveTransactionButtonText = 'transactionCreateOrEdit.saveTransactionButton';
  private readonly createCategoryButtonText = 'transactionCreateOrEdit.createCategoryButton';

  public modal: NgbModalRef;
  public isCategoryCreationVisible: boolean;
  public saveButtonText = this.saveTransactionButtonText;
  public transaction: Transaction;

  public categories$: Observable<Category[]> = this.categoryService.categories$;
  public hasNoCategories$ = this.categories$.pipe(
    map((categories: Category[]) => categories.length === 0 && !this.selectedCategory)
  );

  public transactionForm = this.formBuilder.group({
    id: [null, Validators.required],
    category: [null, Validators.required]
  });

  public get selectedCategory(): Category {
    return this.transactionForm.get('category').value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private modalService: NgbModal,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private loadingService: IsLoadingService
  ) {
  }

  ngOnInit() {
    this.listenToIdChanges();
  }

  private listenToIdChanges(): void {
    this.activeRoute.paramMap
      .pipe(
        filter((paramMap: ParamMap) => paramMap.has('id')),
        mergeMap((paramMap: ParamMap) => this.transactionService.getForEditBy(paramMap.get('id'))),
        untilDestroyed(this)
      )
      .subscribe((transaction: Transaction) => {
        this.transaction = transaction;
        this.transactionForm.setValue({
          id: transaction.id,
          category: transaction.category || null
        });
      });
  }

  ngAfterViewInit(): void {
    this.modal = this.modalService.open(this.modalContent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });

    this.modal.result
      .then(result => {
      }, reason => {
      })
      .finally(() => {
        this.router.navigate(['transactions']);
      });
  }

  ngOnDestroy(): void {
  }

  public update(): void {
    if (this.isCategoryCreationVisible) {
      return;
    }

    const formValue = this.transactionForm.value;
    const updateValues = {
      id: formValue.id,
      categoryId: formValue.category.id
    } as TransactionUpdate;
    this.transactionService.update(updateValues).subscribe(() => {
      this.transactionService.loadTransactions();
      this.modal.close();
      this.router.navigate(['transactions']);
    });
  }

  public selectCategory(category: Category): void {
    this.transactionForm.get('category').setValue(category);
  }

  public toggleCreateCategory() {
    this.isCategoryCreationVisible = !this.isCategoryCreationVisible;

    if (this.isCategoryCreationVisible) {
      this.transactionForm.get('category').setValue(null);
      this.saveButtonText = this.createCategoryButtonText;
    } else {
      this.saveButtonText = this.saveTransactionButtonText;
    }
  }

  public handleCategoryCreated(categoryCreated: Category) {
    this.isCategoryCreationVisible = false;
    this.selectCategory(categoryCreated);
  }

  public handleSave(): void {
    if (this.transactionForm.invalid) {
      return;
    }

    if (this.isCategoryCreationVisible) {
      this.toggleCreateCategory();
      return;
    }

    const categoryCreateCall =
      this.selectedCategory.id == null
        ? this.categoryService.create(this.selectedCategory)
        : of(null as Category);

    this.loadingService.add(categoryCreateCall
      .pipe(
        mergeMap((category: Category) => {
          const formValue = this.transactionForm.value;
          const transactionToUpdate = {
            id: formValue.id,
            categoryId: formValue.category ? formValue.category.id : null
          } as TransactionUpdate;

          if (category) {
            this.categoryService.loadCategories();
            transactionToUpdate.categoryId = category.id;
          }

          return this.transactionService.update(transactionToUpdate);
        })
      )
      .subscribe(() => {
        this.transactionService.loadTransactions();
        this.modal.close('Save click');
      }), {key: 'transaction-update'});
  }
}
