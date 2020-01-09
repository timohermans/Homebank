import React from 'react';
import {formatToCurrency} from '../../shared/functions/format-to-currency';
import {groupBy} from '../../shared/functions/groupBy';
import {BudgetModel} from '../budget/budget.model';
import './BudgetList.scss';

export interface BudgetListProps {
  budgets: BudgetModel[];
}

export const BudgetList: React.FunctionComponent<BudgetListProps> = (props: BudgetListProps) => {
  const categoriesPerGroup = groupBy(props.budgets, budget => budget.categoryGroupName);

  const getFontColorClassFor = (amount: number, includeMarkerColors?: boolean) => {
    if (amount === 0) {
      return 'text-zero';
    }
  };

  const getBackgroundColorClassFor = (amount: number) => {
    if (amount < 0) {
      return 'bg-negative';
    }

    if (amount > 0) {
      return 'bg-positive';
    }

    return '';
  };

  return (
    <div>
      <div className="budget-table">
        <div className="budget-table__row budget-table__row--header">
          <div className="budget-table__category-column budget-table__category-column--small-font">
            Category
          </div>
          <div className="budget-table__column">Budgeted</div>
          <div className="budget-table__column">Activity</div>
          <div className="budget-table__column">Available</div>
        </div>
        {Object.keys(categoriesPerGroup).map((key: string) => {
          const rows = [];

          if (key !== 'Uncategorized') {
            rows.push(
              <div key={key} className="budget-table__row budget-table__row--category-group">
                <div data-label="Category" className="budget-table__category-group-column">
                  {key}
                </div>
                <div
                  data-label="Budgeted"
                  className={`budget-table__column ${getFontColorClassFor(0)}`}
                >
                  <div>{formatToCurrency(0)}</div>
                </div>
                <div
                  data-label="Activity"
                  className={`budget-table__column ${getFontColorClassFor(0)}`}
                >
                  <div>{formatToCurrency(0)}</div>
                </div>
                <div
                  data-label="Available"
                  className={`budget-table__column ${getFontColorClassFor(0)}`}
                >
                  <div>{formatToCurrency(0)}</div>
                </div>
              </div>
            );
          }

          categoriesPerGroup[key].forEach((budget: BudgetModel) => {
            rows.push(
              <div key={budget.categoryId} className="budget-table__row">
                <div data-label="Category" className="budget-table__category-column">
                  <div>{budget.categoryName}</div>
                </div>
                <div
                  data-label="Budgeted"
                  className={`budget-table__column ${getFontColorClassFor(budget.budgeted)}`}
                >
                  <div>{formatToCurrency(budget.budgeted)}</div>
                </div>
                <div
                  data-label="Activity"
                  className={`budget-table__column ${getFontColorClassFor(budget.activity)}`}
                >
                  <div>{formatToCurrency(budget.activity)}</div>
                </div>
                <div
                  data-label="Available"
                  className={`budget-table__column ${getFontColorClassFor(budget.available)}`}
                >
                  <div>
                    <span
                      className={`budget-table__available ${getBackgroundColorClassFor(
                        budget.available
                      )}`}
                    >
                      {formatToCurrency(budget.available)}
                    </span>
                  </div>
                </div>
              </div>
            );
          });

          return rows;
        })}
      </div>
    </div>
  );
};
