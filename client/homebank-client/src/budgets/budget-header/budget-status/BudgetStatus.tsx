import React from 'react';
import './BudgetStatus.scss';

export default function BudgetStatus() {
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
}
