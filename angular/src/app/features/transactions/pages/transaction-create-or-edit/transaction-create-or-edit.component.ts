import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../../categories/models/category.model';
import * as _ from 'lodash';
import { filter, map, mergeMap, switchMap, takeUntil, tap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransactionUpdate } from '../../entities/transaction.model';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-transaction-create-or-edit',
  templateUrl: './transaction-create-or-edit.component.html',
  styleUrls: ['./transaction-create-or-edit.component.scss']
})
export class TransactionCreateOrEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content', { static: false }) modalContent: any;

  public modal: NgbModalRef;
  public isCategoryCreationVisible: boolean;

  public categories$: Observable<Category[]> = this.categoryService.getAll().pipe(shareReplay(1));
  public hasNoCategories$ = this.categories$.pipe(
    map((categories: Category[]) => categories.length === 0)
  );

  public transactionForm = this.formBuilder.group({
    id: [null],
    payee: [null],
    memo: [null],
    categoryId: []
  });

  public get selectedCategoryId(): string {
    return this.transactionForm.get('categoryId').value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private modalService: NgbModal,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

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
        this.transactionForm.setValue({
          id: transaction.id,
          payee: transaction.payee,
          memo: transaction.memo,
          categoryId: transaction.category ? transaction.category.id : null
        });
      });
  }

  ngAfterViewInit(): void {
    this.modal = this.modalService.open(this.modalContent, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });

    this.modal.result
      .then(result => {}, reason => {})
      .finally(() => {
        this.router.navigate(['transactions']);
      });
  }

  ngOnDestroy(): void {}

  public update(): void {
    if (this.isCategoryCreationVisible) {
      return;
    }

    const updateValues = this.transactionForm.value as TransactionUpdate;
    this.transactionService.update(updateValues).subscribe(() => {
      this.modal.close();
      this.router.navigate(['transactions']);
    });
  }

  public selectCategory(id: string): void {
    this.transactionForm.get('categoryId').setValue(id);
  }

  public toggleCreateCategory() {
    this.isCategoryCreationVisible = !this.isCategoryCreationVisible;
  }

  public handleCategoryCreated(categoryCreated: Category) {

  }

}
