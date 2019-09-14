import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CategoryService} from '../../categories/shared/services/category.service';
import {Category} from '../../categories/shared/models/category.model';
import * as _ from 'lodash';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Dictionary} from '@ngrx/entity';

@Component({
  selector: 'app-transaction-create-or-edit',
  templateUrl: './transaction-create-or-edit.component.html',
  styleUrls: ['./transaction-create-or-edit.component.scss']
})
export class TransactionCreateOrEditComponent implements OnInit, AfterViewInit {
  @ViewChild('content', {static: false}) modalContent: any;

  public categories$: Observable<{groupName: string, categories: Category[]}[]> = this.categoryService.getAll()
    .pipe(
      map((categories: Category[]) => _.groupBy(categories, (category) => category.categoryGroup.name)),
      map((categoriesPerGroup: { [name: string]: Category[] }) => _.map(categoriesPerGroup, (group, key) => ({
        groupName: key,
        categories: group
      })))
    );

  public transactionForm = this.formBuilder.group({
    id: [null],
    payee: [null],
    memo: [null],
    category: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.modalService
      .open(this.modalContent, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static'
      })
      .result.then(result => {
    }, reason => {
    })
      .finally(() => {
        this.router.navigate(['transactions']);
      });
  }

  public selectCategory(category: Category): void {

  }
}
