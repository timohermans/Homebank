import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Transaction } from './features/transactions/shared/entities/transaction.model';
import {
  ColumnType,
  TableActionEvent,
  TableActionType,
  TableData,
  TableRequest
} from './shared/components/table/table.model';
import { TranslateService } from '@ngx-translate/core';
import { map, mergeMap } from 'rxjs/operators';
import { slice } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  columnType = ColumnType;
  actionType = TableActionType;
  title = 'thuisbank';

  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('nl');
  }

  private transactions = [];
  public transactions$: Observable<TableData>;
  public tableDataRequest$ = new BehaviorSubject<TableRequest>({
    pageSize: 5,
    page: 1
  });

  ngOnInit(): void {
    this.setupFakeApi();
    this.setupTableData();
  }

  private setupFakeApi(): void {
    for (let i = 0; i < 999; i++) {
      this.transactions.push({
        id: i + i * 1,
        date: new Date(2019, 8, 2),
        inFlow: 102.23,
        outFlow: 0,
        isBankTransaction: false,
        isInflowForBudgeting: true,
        memo: 'Mini salaris',
        payee: 'Werk b.v.'
      } as Transaction);
      this.transactions.push({
        id: i + i * 2,
        date: new Date(2019, 8, 5),
        inFlow: 0,
        outFlow: 55.0,
        isBankTransaction: false,
        isInflowForBudgeting: false,
        memo: 'Pintransactie 1',
        payee: 'Lidl Sittard'
      } as Transaction);
      this.transactions.push({
        id: i + i * 3,
        date: new Date(2019, 8, 5),
        inFlow: 50.4,
        outFlow: 0,
        isBankTransaction: false,
        isInflowForBudgeting: false,
        memo: 'Pintransactie 2',
        payee: 'Jan Linders Sittards'
      } as Transaction);
    }
  }

  private setupTableData(): void {
    this.transactions$ = combineLatest(this.tableDataRequest$).pipe(
      mergeMap(([tableRequest]) => {
        // this normally would be an api call
        const transactions = slice(
          this.transactions,
          (tableRequest.page - 1) * tableRequest.pageSize,
          (tableRequest.page - 1) * tableRequest.pageSize + tableRequest.pageSize
        );

        return of({
          items: transactions,
          meta: {
            totalSize: this.transactions.length,
            isAsync: true,
            page: tableRequest.page,
            pageSize: tableRequest.pageSize
          }
        } as TableData);
      })
    );
  }

  public deleteTransaction(actionEvent: TableActionEvent): void {
    alert(JSON.stringify(actionEvent));
  }
}
