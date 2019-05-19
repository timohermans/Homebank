import * as React from 'react';
import {BudgetStatus} from './budget-status/BudgetStatus';
import './BudgetHeader.scss';
import MonthPicker from './month-picker/MonthPicker';

export interface BudgetHeaderProps {
  onMonthSelected: (month: Date) => void;
  monthSelected: Date;
}

export class BudgetHeader extends React.Component<BudgetHeaderProps> {
  public render() {
    return (
      <nav className="navbar bg-header navbar-dark">
        <div className="navbar__month-picker">
          <MonthPicker
            monthSelected={this.props.monthSelected}
            onMonthSelected={this.props.onMonthSelected}
          />
        </div>

        <div className="navbar__budget-status">
          <BudgetStatus />
        </div>
      </nav>
    );
  }
}
