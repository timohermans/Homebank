import './MonthPicker.scss';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MonthPickerModal } from './month-picker-modal/MonthPickerModal';
import { format, addMonths } from 'date-fns';

export interface MonthPickerProps {
  onMonthSelected: (month: Date) => void;
  monthSelected: Date;
}

export class MonthPicker extends Component<MonthPickerProps> {
  render() {
    return (
      <div className="form-inline flex-grow-1 d-flex justify-content-center">
        <div className="px-2 icon" onClick={() => this.props.onMonthSelected(addMonths(this.props.monthSelected, -1))}>
          <FontAwesomeIcon icon="arrow-alt-circle-left" />
        </div>
        <div className="selected-month">
          {format(this.props.monthSelected, 'MMM YYYY')} <FontAwesomeIcon className="text-primary" icon="caret-down" />
          <MonthPickerModal
            month={this.props.monthSelected}
            onMonthSelected={this.props.onMonthSelected}
          />
        </div>
        <div className="px-2 icon" onClick={() => this.props.onMonthSelected(addMonths(this.props.monthSelected, 1))}>
          <FontAwesomeIcon icon="arrow-alt-circle-right" />
        </div>
      </div>
    );
  }
}

export default MonthPicker;
