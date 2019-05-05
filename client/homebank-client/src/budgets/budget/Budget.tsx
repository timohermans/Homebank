import * as React from 'react';
import {BudgetHeader} from '../budget-header/BudgetHeader';
import {isSameMonth} from 'date-fns';

interface BudgetState {
  monthSelected: Date;
}

export class Budget extends React.Component<{}, BudgetState> {
  constructor(props: BudgetState) {
    super(props);

    this.state = {monthSelected: new Date()};
  }

  private monthChangedBy = (monthSelected: Date) => {
    this.setState((previousState: BudgetState) => {
      if (isSameMonth(previousState.monthSelected, monthSelected)) {
        return;
      }

      return {monthSelected: monthSelected};
    });
  };

  render() {
    return (
      <div>
        <BudgetHeader
          monthSelected={this.state.monthSelected}
          onMonthSelected={this.monthChangedBy}
        />
        <h1>Budget works!</h1>
      </div>
    );
  }
}
