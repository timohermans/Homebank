import React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring';

const StyledTransactionItem = styled(animated.div)`
  color: ${props => props.theme.colors.secondary2};
  display: flex;
  padding: ${props => props.theme.spacing.s};

  &:hover {
    cursor: pointer;
  }

  > *:not(:first-child):not(:last-child) {
    margin: 0 ${props => props.theme.spacing.s};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  .main {
    flex: 1;
  }

  .date {
    color: ${props => props.theme.colors.dark};
  }
`;


export default function TransactionListItem({transaction, transition}) {
    return (<StyledTransactionItem style={transition} key={transaction.id}>
        <div className="date">{transaction.date}</div>
        <div className="main">{transaction.payee}</div>
        <div>
          {transaction.inflow ? transaction.inflow : transaction.outflow}
        </div>
      </StyledTransactionItem>);
}