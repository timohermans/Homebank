import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Observable } from 'rxjs';
import { Transaction } from '../../entities/transaction.model';
import {CategoryService} from '../../../categories/services/category.service';

// FEATURE: Make sure duplicate records aren't uploaded again
// FEATURE: Try to match and align the previously selected cateogries when uploaded

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.css']
})
export class TransactionOverviewComponent implements OnInit {
  public transactions$: Observable<Transaction[]> = this.transactionService.getTransactions();

  constructor(private transactionService: TransactionService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.transactionService.loadTransactions();
    this.categoryService.loadCategories();
  }
}
