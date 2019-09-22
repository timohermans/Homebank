import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Observable } from 'rxjs';
import { Transaction } from '../../entities/transaction.model';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.css']
})
export class TransactionOverviewComponent implements OnInit {
  public transactions$: Observable<Transaction[]> = this.transactionService.getTransactions();

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {}
}
