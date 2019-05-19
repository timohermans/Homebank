import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './BudgetStatus.scss';

interface MonthSummary {
  balance: number;
  budgetedInTheFuture: number;
  budgetedThisMonth: number;
  fundsAvailable: number;
  overspentLastMonth: number;
}

export const BudgetStatus: React.FunctionComponent = () => {
  const [status, setStatus] = useState({
    balance: 0,
    budgetedInTheFuture: 0,
    budgetedThisMonth: 0,
    fundsAvailable: 0,
    overspentLastMonth: 0,
  });

  useEffect(() => {
    axios
      .request<MonthSummary>({
        url: 'https://localhost:44344/api/budget/total-balance/2019-04-01',
      })
      .then(response => {
        setStatus(response.data);
      })
      .catch(error => {
        console.log(error);
       });
  }, []);

  const formatToCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat('nl-NL', {
      currency: 'EUR',
      minimumFractionDigits: 2,
      style: 'currency',
    });

    return formatter.format(value);
  }

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