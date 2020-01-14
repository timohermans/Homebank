import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../../entities/transaction.model";

// FEATURE: Show a loading indicator when transactions are loading
@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  @Input() transactions: Transaction[];

  ngOnInit(): void {
  }
}
