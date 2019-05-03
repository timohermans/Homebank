import React from 'react';
import './MonthPicker.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface MonthPickerProps {
  year: number
}

export class MonthPicker extends React.Component<MonthPickerProps> {
  constructor(props: MonthPickerProps) {
    super(props);
  }

  render() {
    return  <div className="month-picker bg-light text-dark">
      <div className="year-row d-flex justify-content-between align-items-center mx-2">
        <div className="icon"><FontAwesomeIcon icon="arrow-alt-circle-left"></FontAwesomeIcon></div>
        <div className="year">2019</div>
        <div className="icon"><FontAwesomeIcon icon="arrow-alt-circle-right"></FontAwesomeIcon></div>
      </div>

      <div className="month-container row align-items-center mx-2 my-1">
        <div className="col-3 month d-flex align-items-center">Jan</div>
      </div>

    </div>
  }
}