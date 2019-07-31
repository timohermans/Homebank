import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Transaction} from '../../shared/entities/transaction.model';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  public transactions$: Observable<Transaction[]> = this.store.select(state => state.transactions);

  constructor(private store: Store<{transactions: Transaction[]}>) {}

  ngOnInit() {}
}
