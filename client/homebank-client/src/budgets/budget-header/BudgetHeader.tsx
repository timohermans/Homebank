import * as React from 'react';
import './BudgetHeader.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {MonthPicker} from './month-picker/MonthPicker';

export class BudgetHeader extends React.Component {
  render() {
    return (
      <nav className="navbar bg-header navbar-dark">
        <div className="form-inline flex-grow-1 d-flex justify-content-center">
          <div className="px-2 icon">
            <FontAwesomeIcon icon="arrow-alt-circle-left" />
          </div>
          <div className="selected-month">
            APR 2019 <FontAwesomeIcon icon="caret-down" />
            <MonthPicker month={new Date()} />
          </div>
          <div className="px-2 icon">
            <FontAwesomeIcon icon="arrow-alt-circle-right" />
          </div>
        </div>

        <div className="flex-grow-1">2</div>

        <div className="flex-grow-1">3</div>
      </nav>
    );
  }
}
