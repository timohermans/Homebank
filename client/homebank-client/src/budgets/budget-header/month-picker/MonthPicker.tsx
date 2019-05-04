import React from 'react';
import './MonthPicker.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';

export interface MonthPickerProps {
  year: number;
  month: number;
}

export class MonthPicker extends React.Component<MonthPickerProps> {
  render() {
    const months = this.createMonthsToSelect();

    return (
      <div className="month-picker bg-light text-dark">
        <div className="year-row d-flex justify-content-between align-items-center mx-2">
          <div className="icon">
            <FontAwesomeIcon icon="arrow-alt-circle-left" />
          </div>
          <div className="year">2019</div>
          <div className="icon">
            <FontAwesomeIcon icon="arrow-alt-circle-right" />
          </div>
        </div>

        <div className="month-container d-flex flex-wrap align-items-center justify-content-center mx-2 my-1">
          {months}
        </div>
      </div>
    );
  }

  private createMonthsToSelect(): JSX.Element[] {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(this.props.year, i);
      const monthDisplay = format(month, 'MMM');
      const selectedClass = i === this.props.month ? 'is-selected' : '';

      months.push(
        // i can safely use i here because the months and order are static
        // https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js/43892905#43892905
        <div key={i} className={`month-picker-month m-1 d-flex align-items-center justify-content-center ${selectedClass}`}>
          {monthDisplay}
        </div>
      );
    }
    return months;
  }
}
