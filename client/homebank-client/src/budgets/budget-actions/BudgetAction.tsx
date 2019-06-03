import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import './BudgetAction.scss';

const BudgetAction: React.FunctionComponent = () => {
  return (
    <div className="budget-actions">
      <div className="budget-actions__create">
        <FontAwesomeIcon className="budget-actions__icon" icon="plus-circle" />
        <span>Category group</span>
      </div>
    </div>
  );
};

export default BudgetAction;