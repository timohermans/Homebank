import {isSameMonth} from 'date-fns';
import format from 'date-fns/format';
import React, {useEffect, useState} from 'react';
import {useHomebankApi} from '../../shared/hooks/homebankApi';
import {BudgetHeader} from '../budget-header/BudgetHeader';
import {BudgetList} from '../budget-list/BudgetList';
import {BudgetModel, BudgetResponse} from './budget.model';

interface BudgetState {
  monthSelected: Date;
}

export const Budget: React.FunctionComponent = () => {
  const [monthSelected, setMonthSelected] = useState(new Date());
  const {apiResult: budgetResponse, error, isLoading, doFetch} = useHomebankApi<BudgetResponse>({
    budgets: [],
  }); // TODO: handle the loading and error handling

  useEffect(() => {
    doFetch(`budget/${format(monthSelected, 'YYYY-MM-01')}`);
  }, [monthSelected, doFetch]);

  const monthChangedBy = (newMonth: Date) => {
    if (isSameMonth(monthSelected, newMonth)) {
      return;
    }

    setMonthSelected(newMonth);
  };

  return (
    <div>
      <BudgetHeader monthSelected={monthSelected} onMonthSelected={monthChangedBy} />
      <BudgetList budgets={budgetResponse.budgets} />
    </div>
  );
};
