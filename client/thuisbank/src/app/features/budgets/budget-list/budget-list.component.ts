import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Store, select } from '@ngrx/store';
import { BudgetModel, BudgetPerGroupModel } from '../shared/budget.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit {
  public budget$: Observable<BudgetPerGroupModel[]>;

  constructor(store: Store<{ budgets: BudgetModel[] }>) {
    this.budget$ = store.pipe(
      select(state => state.budgets),
      map(this.groupBudgetItemsByGroup)
    );
  }

  private groupBudgetItemsByGroup(budgetItems: BudgetModel[]): BudgetPerGroupModel[] {
    return _.chain(budgetItems)
      .groupBy(budget => budget.categoryGroupName)
      .map(
        (budgetsForGroup, categoryGroupName) =>
          ({
            categoryGroupName,
            budgets: budgetsForGroup
          } as BudgetPerGroupModel)
      )
      .value();
  }

  ngOnInit() {}

  public sum(budgets: BudgetModel[], propertyToSum: string): number {
    const propertyValues = budgets.map(budget => {
      const value = budget[propertyToSum];

      if (!value && isNaN(value)) {
        throw new Error('property not found or not a number');
      }

      return value;
    }) as number[];

    return propertyValues.reduce((previousValue, currentValue) => previousValue + currentValue);
  }
}