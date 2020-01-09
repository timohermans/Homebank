import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Transaction } from './features/transactions/entities/transaction.model';
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
    this.setupTableData();
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
