import React from 'react';
import {groupBy} from '../../shared/functions/groupBy';
import {BudgetModel} from '../budget/budget.model';
import './BudgetList.scss';

export interface BudgetListProps {
  budgets: BudgetModel[];
}

export const BudgetList: React.FunctionComponent<BudgetListProps> = (props: BudgetListProps) => {
  const categoriesPerGroup = groupBy(props.budgets, budget => budget.categoryGroupName);

  return (
    <div>
      <div className="budget-table">
        <div className="budget-table__row budget-table__row--header">
          <div className="budget-table__category-column">Category</div>
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
                <div data-label="Budgeted" className="budget-table__column">
                  <div>0</div>
                </div>
                <div data-label="Activity" className="budget-table__column">
                  <div>0</div>
                </div>
                <div data-label="Available" className="budget-table__column">
                  <div>0</div>
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
                <div data-label="Budgeted" className="budget-table__column">
                  <div>{budget.budgeted}</div>
                </div>
                <div data-label="Activity" className="budget-table__column">
                  <div>{budget.activity}</div>
                </div>
                <div data-label="Available" className="budget-table__column">
                  <div>{budget.available}</div>
                </div>
              </div>
            );
          });

          return rows;
        })}
      </div>

      {/* {Object.keys(categoriesPerGroup).map((key: string, index: number) => {
        return (
          <table className="table budget-table" key={key}>
            <colgroup>
              <col className="budget-table__category-column" />
              <col className="budget-table__column" />
              <col className="budget-table__column" />
              <col className="budget-table__column" />
            </colgroup>
            <thead>
              <tr>
                <th>{key}</th>
                <th>0</th>
                <th>0</th>
                <th>0</th>
              </tr>
            </thead>
            <tbody>
              {categoriesPerGroup[key].map((budget: BudgetModel) => {
                return (
                  <tr key={budget.categoryId}>
                    <td>{budget.categoryName}</td>
                    <td>{budget.budgeted}</td>
                    <td>{budget.activity}</td>
                    <td>{budget.available}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })} */}
    </div>
  );
};
