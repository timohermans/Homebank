import * as React from 'react';
import './BudgetHeader.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {MonthPickerModal} from './month-picker/month-picker-modal/MonthPickerModal';
import {format} from 'date-fns';
import MonthPicker from './month-picker/MonthPicker';

export interface BudgetHeaderProps {
  onMonthSelected: (month: Date) => void;
  monthSelected: Date;
}

export class BudgetHeader extends React.Component<BudgetHeaderProps> {
  render() {
    return (
      <nav className="navbar bg-header navbar-dark">
        <MonthPicker
          monthSelected={this.props.monthSelected}
          onMonthSelected={this.props.onMonthSelected}
        />

        <div className="flex-grow-1">2</div>

        <div className="flex-grow-1">3</div>
      </nav>
    );
  }
}
