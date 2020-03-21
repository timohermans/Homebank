import * as React from "react";
import styled from "styled-components";
import { useTrail, useSpring } from "react-spring";
import TransactionListItem from "./TransactionListItem";
import useMeasure from "react-use-measure";
import { animated } from "react-spring";

const StyledTransactionList = styled(animated.div)`
  margin-top: ${props => props.theme.spacing.s};
  background-color: ${props => props.theme.colors.section};
  border-radius: ${props => props.theme.rounded};
  box-shadow: ${props => props.theme.shadow};
`;

export default function TransactionList({ transactions }) {
  const [bind, { height }] = useMeasure();
  const props = useSpring({
    from: { height: 0 },
    to: { height }
  });
  const transitions = useTrail(transactions.length, {
    from: { opacity: 0, transform: "translate(10px, 0)" },
    opacity: 1,
    transform: "translate(0, 0)"
  });

  return (
    <StyledTransactionList style={props}>
      <div ref={bind}>
        {transitions.map((props, index) => (
          <TransactionListItem
            key={transactions[index].id}
            transition={props}
            transaction={transactions[index]}
          />
        ))}
      </div>
    </StyledTransactionList>
  );
}
