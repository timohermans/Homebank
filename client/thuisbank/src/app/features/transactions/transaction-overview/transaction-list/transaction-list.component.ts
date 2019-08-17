import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Transaction} from '../../shared/entities/transaction.model';
import {ColumnType, TableActionType} from '../../../../shared/components/table/table.model';
import {TransactionFacade} from '../../shared/transaction.facade';

@Component({
  selector: 'app-transaction-list',
  template: `
      <app-table [data]="transactions$ | async">
          <app-table-column labelTranslationKey="transaction.id" property="id"
                            [columnType]="columnType.String"
                            [classes]="['column__big']"></app-table-column>
          <app-table-date-column labelTranslationKey="transaction.date" property="date"></app-table-date-column>
          <app-table-column labelTranslationKey="transaction.payee" property="payee"
                            [columnType]="columnType.String"></app-table-column>
          <app-table-column labelTranslationKey="transaction.memo" property="memo"
                            [columnType]="columnType.String"></app-table-column>
          <app-table-column labelTranslationKey="transaction.inflow" property="inFlow"
                            [columnType]="columnType.Money"></app-table-column>
          <app-table-column labelTranslationKey="transaction.outflow" property="outFlow"
                            [columnType]="columnType.Money"></app-table-column>
          <app-table-action [actionType]="actionType.Edit" labelTranslationKey="transaction.edit"></app-table-action>
      </app-table>
  `,
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  columnType = ColumnType;
  actionType = TableActionType;

  public transactions$: Observable<Transaction[]> = this.facade.transactions$;

  constructor(private facade: TransactionFacade) {
  }

  ngOnInit() {
    this.facade.loadTransactions();
  }
}
