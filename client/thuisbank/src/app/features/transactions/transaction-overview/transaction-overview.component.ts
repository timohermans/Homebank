import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../shared/services/transaction.service';
import {Observable} from 'rxjs';
import {Transaction} from '../shared/entities/transaction.model';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.css']
})
export class TransactionOverviewComponent implements OnInit {

  // TODO: create the loading indicator pipe from the feedly article
  public transactions$: Observable<Transaction[]> = this.transactionService.getTransactions();

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

}
