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
        <div className="budget-table__row">
          <div className="budget-table__category-column">Category</div>
          <div className="budget-table__column">Budgeted</div>
          <div className="budget-table__column">Activity</div>
          <div className="budget-table__column">Available</div>
        </div>
        {Object.keys(categoriesPerGroup).map((key: string) => {
          const rows = [];

          rows.push(
            <div key={key} className="budget-table__row budget-table__row--category-group">
              <div className="budget-table__category-column">{key}</div>
              <div className="budget-table__column">0</div>
              <div className="budget-table__column">0</div>
              <div className="budget-table__column">0</div>
            </div>
          );

          categoriesPerGroup[key].forEach((budget: BudgetModel) => {
            rows.push(
              <div key={budget.categoryId} className="budget-table__row">
                <div className="budget-table__category-column">{budget.categoryName}</div>
                <div className="budget-table__column">{budget.budgeted}</div>
                <div className="budget-table__column">{budget.activity}</div>
                <div className="budget-table__column">{budget.available}</div>
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
