import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../../entities/transaction.model';
import {
  ColumnType,
  TableActionEvent,
  TableActionType
} from '../../../../../shared/components/table/table.model';
import { Router } from '@angular/router';

// FEATURE: Show a loading indicator when transactions are loading

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  @Input() transactions: Transaction[];
  columnType = ColumnType;
  actionType = TableActionType;

  constructor(private router: Router) {}

  ngOnInit() {}

  public goToEdit(actionEvent: TableActionEvent): void {
    this.router.navigate(['transactions', actionEvent.item.id, 'edit']);
  }
}
