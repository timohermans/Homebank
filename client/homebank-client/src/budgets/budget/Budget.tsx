import * as React from 'react';
import {BudgetHeader} from '../budget-header/BudgetHeader';

export class Budget extends React.Component {
    render() {
        return <div>
            <BudgetHeader/>
            <h1>Budget works!</h1>
        </div>;
    }
}
