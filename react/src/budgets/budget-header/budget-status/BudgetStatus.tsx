import {format} from 'date-fns';
import React, {useEffect} from 'react';
import {formatToCurrency} from '../../../shared/functions/format-to-currency';
import {useHomebankApi} from '../../../shared/hooks/homebankApi';
import './BudgetStatus.scss';

interface MonthSummary {
  balance: number;
  budgetedInTheFuture: number;
  budgetedThisMonth: number;
  fundsAvailable: number;
  overspentLastMonth: number;
}

interface BudgetStatusProps {
  monthSelected: Date;
}

export const BudgetStatus: React.FunctionComponent<BudgetStatusProps> = (
  props: BudgetStatusProps
) => {
  const {apiResult: status, error, isLoading, doFetch} = useHomebankApi<MonthSummary>({
    // TODO: handle the loading and error handling
    balance: 0,
    budgetedInTheFuture: 0,
    budgetedThisMonth: 0,
    fundsAvailable: 0,
    overspentLastMonth: 0,
  });

  useEffect(() => {
    const monthRouteParam = format(props.monthSelected, 'YYYY-MM-01');
    doFetch(`budget/total-balance/${monthRouteParam}`);
  }, [props.monthSelected, doFetch]);

  const getStatusModifier = () => {
    if (!status) {
      return '';
    }

    return status.balance < 0 ? 'budget-status--negative' : 'budget-status--positive';
  };

  return (
    <div className="budget-status">
      <div className="budget-status__summary-container">
        <div className={`budget-status__summary  ${getStatusModifier()}`}>
          <div className="budget-status__amount">{formatToCurrency(status.balance)}</div>
          <div className="budget-status__amount-description">To Be Budgeted</div>
        </div>
        <div className="budget-status__arrow">
          <div className={`arrow ${getStatusModifier()}`} />
        </div>
      </div>
      <div className="budget-status__details">
        <div className="budget-status__column budget-status__column--align_right">
          <div>{formatToCurrency(status.fundsAvailable)}</div>
          <div>{formatToCurrency(status.overspentLastMonth)}</div>
          <div>{formatToCurrency(status.budgetedThisMonth)}</div>
          <div>{formatToCurrency(status.budgetedInTheFuture)}</div>
        </div>
        <div className="budget-status__column budget-status__column--italic">
          <div>Funds for May</div>
          <div>Overspent in Apr</div>
          <div>Budgeted in May</div>
          <div>Budgeted in Future</div>
        </div>
        <div />
      </div>
    </div>
  );
};
