import React, {useEffect} from 'react';
import {BudgetModel} from '../budget/budget.model';

export interface BudgetListProps {
  budgets: BudgetModel[];
}

export const BudgetList: React.FunctionComponent<BudgetListProps> = (props: BudgetListProps) => {
  return (
    <div>
      <h1>list!</h1>
      <ul>
        {props.budgets.map(budget => (
          <li key={budget.categoryId}>{budget.categoryName}</li>
        ))}
      </ul>
    </div>
  );
};
