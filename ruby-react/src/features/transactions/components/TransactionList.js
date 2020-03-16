import * as React from "react";
import styled from "styled-components";

const StyledTransactionList = styled.div`
  margin-top: ${props => props.theme.spacing.s};
  background-color: ${props => props.theme.section};
  border-radius: ${props => props.theme.rounded};
  box-shadow: ${props => props.theme.shadow};
`;

const StyledTransactionItem = styled.div`
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

export default function TransactionList(props) {
  return (
    <StyledTransactionList>
      {props.transactions.map(transaction => (
        <StyledTransactionItem key={transaction.id}>
          <div className="date">{transaction.date}</div>
          <div className="main">{transaction.payee}</div>
          <div>
            {transaction.inflow ? transaction.inflow : transaction.outflow}
          </div>
        </StyledTransactionItem>
      ))}
    </StyledTransactionList>
  );
}
