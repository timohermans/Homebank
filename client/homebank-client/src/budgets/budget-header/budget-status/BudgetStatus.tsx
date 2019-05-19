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
        url: 'https://localhost:44344/api/total-balance/2019-04-01',
      })
      .then(response => {
        console.log(response.data);
        setStatus(response.data);
      })
      .catch(error => {  });
  });

  return (
    <div className="budget-status">
      <div className="budget-status__summary-container">
        <div className="budget-status__summary">
          <div className="budget-status__amount">$0.00</div>
          <div className="budget-status__amount-description">To Be Budgeted</div>
        </div>
        <div className="budget-status__arrow">
          <div className="arrow" />
        </div>
      </div>
      <div className="budget-status__details">
        <div className="budget-status__column budget-status__column--align_right">
          <div>$0.00</div>
          <div>$1500.00</div>
          <div>-$30.00</div>
          <div>$0.00</div>
        </div>
        <div className="budget-status__column budget-status__column--italic">
          <div>Fund for May</div>
          <div>Overspent in Apr</div>
          <div>Budgeted in May</div>
          <div>Budgeted in Future</div>
        </div>
        <div />
      </div>
    </div>
  );
};
