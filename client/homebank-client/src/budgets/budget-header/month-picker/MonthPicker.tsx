import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {addMonths, format} from 'date-fns';
import React, {Component} from 'react';
import {MonthPickerModal} from './month-picker-modal/MonthPickerModal';
import './MonthPicker.scss';

export interface MonthPickerProps {
  onMonthSelected: (month: Date) => void;
  monthSelected: Date;
}

export class MonthPicker extends Component<MonthPickerProps> {
  public render() {
    return (
      <div className="form-inline flex-grow-1 d-flex justify-content-center">
        <div
          className="px-2 icon"
          onClick={() => this.props.onMonthSelected(addMonths(this.props.monthSelected, -1))}
        >
          <FontAwesomeIcon icon="arrow-alt-circle-left" />
        </div>
        <div className="selected-month">
          {format(this.props.monthSelected, 'MMM YYYY')}{' '}
          <FontAwesomeIcon className="text-primary" icon="caret-down" />
          <MonthPickerModal
            month={this.props.monthSelected}
            onMonthSelected={this.props.onMonthSelected}
          />
        </div>
        <div
          className="px-2 icon"
          onClick={() => this.props.onMonthSelected(addMonths(this.props.monthSelected, 1))}
        >
          <FontAwesomeIcon icon="arrow-alt-circle-right" />
        </div>
      </div>
    );
  }
}

export default MonthPicker;
