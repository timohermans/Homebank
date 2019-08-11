import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Transaction} from './features/transactions/shared/entities/transaction.model';
import {ColumnType, TableActionEvent, TableActionType} from './shared/components/table/table.model';
import {TranslateService} from '@ngx-translate/core';

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

  public transactions$: Observable<Transaction[]> = of([
    {
      id: 1,
      date: new Date(2019, 8, 2),
      inFlow: 102.23,
      outFlow: 0,
      isBankTransaction: false,
      isInflowForBudgeting: true,
      memo: 'Mini salaris',
      payee: 'Werk b.v.'
    } as Transaction,
    {
      id: 2,
      date: new Date(2019, 8, 5),
      inFlow: 0,
      outFlow: 55.0,
      isBankTransaction: false,
      isInflowForBudgeting: false,
      memo: 'Pintransactie 1',
      payee: 'Lidl Sittard'
    } as Transaction,
    {
      id: 3,
      date: new Date(2019, 8, 5),
      inFlow: 50.4,
      outFlow: 0,
      isBankTransaction: false,
      isInflowForBudgeting: false,
      memo: 'Pintransactie 2',
      payee: 'Jan Linders Sittards'
    } as Transaction
  ]);

  ngOnInit(): void {
    const transactions = [];
    for (let i = 0; i < 999; i++) {
      transactions.push({
        id: i + i * 1,
        date: new Date(2019, 8, 2),
        inFlow: 102.23,
        outFlow: 0,
        isBankTransaction: false,
        isInflowForBudgeting: true,
        memo: 'Mini salaris',
        payee: 'Werk b.v.'
      } as Transaction);
      transactions.push({
        id: i + i * 2,
        date: new Date(2019, 8, 5),
        inFlow: 0,
        outFlow: 55.0,
        isBankTransaction: false,
        isInflowForBudgeting: false,
        memo: 'Pintransactie 1',
        payee: 'Lidl Sittard'
      } as Transaction);
      transactions.push({
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
    this.transactions$ = of(transactions);
  }

  public deleteTransaction(actionEvent: TableActionEvent): void {
    alert(JSON.stringify(actionEvent));
  }

}
