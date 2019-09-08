import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../shared/services/transaction.service';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.css']
})
export class TransactionOverviewComponent implements OnInit {

  // TODO: load the transactions here, start working with animations
  // TODO: create the loading indicator pipe from the feedly article
  public transactions$ = this.transactionService.getTransactions();

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

}
