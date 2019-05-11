import {isSameMonth} from 'date-fns';
import * as React from 'react';
import {BudgetHeader} from '../budget-header/BudgetHeader';

interface BudgetState {
  monthSelected: Date;
}

export class Budget extends React.Component<{}, BudgetState> {
  constructor(props: BudgetState) {
    super(props);

    this.state = {monthSelected: new Date()};
  }

  public render() {
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

  private monthChangedBy = (monthSelected: Date) => {
    this.setState((previousState: BudgetState) => {
      if (isSameMonth(previousState.monthSelected, monthSelected)) {
        return;
      }

      return {monthSelected};
    });
  };
}
