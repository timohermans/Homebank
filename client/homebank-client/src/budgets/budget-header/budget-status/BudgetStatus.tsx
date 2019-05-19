import axios from 'axios';
import { format } from 'date-fns';
import React, {useEffect, useState} from 'react';
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
  const [status, setStatus] = useState({
    balance: 0,
    budgetedInTheFuture: 0,
    budgetedThisMonth: 0,
    fundsAvailable: 0,
    overspentLastMonth: 0,
  });

  useEffect(() => {
    const monthRouteParam = format(props.monthSelected, 'YYYY-MM-01');

    axios
      .request<MonthSummary>({
        url: `${process.env.REACT_APP_API_URL}/api/budget/total-balance/${monthRouteParam}`,
      })
      .then(response => {
        setStatus(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.monthSelected]);

  const formatToCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat('nl-NL', {
      currency: 'EUR',
      minimumFractionDigits: 2,
      style: 'currency',
    });

    return formatter.format(value);
  };

  return (
    <div className="budget-status">
      <div className="budget-status__summary-container">
        <div className="budget-status__summary">
          <div className="budget-status__amount">{formatToCurrency(status.balance)}</div>
          <div className="budget-status__amount-description">To Be Budgeted</div>
        </div>
        <div className="budget-status__arrow">
          <div className="arrow" />
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
