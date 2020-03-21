import * as React from "react";
import styled from "styled-components";
import { useTrail } from "react-spring";
import TransactionListItem from "./TransactionListItem";

const StyledTransactionList = styled.div`
  margin-top: ${props => props.theme.spacing.s};
  background-color: ${props => props.theme.colors.section};
  border-radius: ${props => props.theme.rounded};
  box-shadow: ${props => props.theme.shadow};
`;

export default function TransactionList({ transactions }) {
  const transitions = useTrail(transactions.length, {
    from: { opacity: 0, transform: "translate(10px, 0)" },
    opacity: 1,
    transform: "translate(0, 0)"
  });

  return (
    <StyledTransactionList>
      {transitions.map((props, index) => (
        <TransactionListItem transition={props} transaction={transactions[index]} />
      ))}
    </StyledTransactionList>
  );
}
