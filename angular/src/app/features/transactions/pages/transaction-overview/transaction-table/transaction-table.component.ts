import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../../entities/transaction.model";
import {ColumnType, TableActionEvent, TableActionType} from "../../../../../shared/components/table/table.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {
  @Input() transactions: Transaction[];
  columnType = ColumnType;
  actionType = TableActionType;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public goToEdit(actionEvent: TableActionEvent): void {
    this.router.navigate(['transactions', actionEvent.item.id, 'edit']);
  }
}
