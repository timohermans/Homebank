import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Transaction} from '../../shared/entities/transaction.model';
import {ColumnType, TableActionType} from '../../../../shared/components/table/table.model';
import {ApolloQueryResult} from 'apollo-client';
import {TransactionService} from '../../shared/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  columnType = ColumnType;
  actionType = TableActionType;

  public transactions$: Observable<Transaction[]> = this.transactionService.getTransactions();

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
  }
}
