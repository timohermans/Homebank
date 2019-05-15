import React from 'react';
import './BudgetStatus.scss';

export default function BudgetStatus() {
  return (
    <div className="budget-status">
      <div className="mr-2">
        <div>$0.00</div>
        <div>To Be Budgeted</div>
      </div>
      <div className="budget-status__details">
        <div className="column text-right mr-2">
          <small>$0.00</small>
          <small>$1500.00</small>
          <small>-$30.00</small>
          <small>$0.00</small>
        </div>
        <div className="column">
          <small>Fund for May</small>
          <small>Overspent in Apr</small>
          <small>Budgeted in May</small>
          <small>Budgeted in Future</small>
        </div>
        <div />
      </div>
    </div>
  );
}
