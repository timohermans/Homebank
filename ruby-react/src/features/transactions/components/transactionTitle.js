import * as React from "react";
import styled from "styled-components";

const StyledTransactionTitle = styled.h1`
  color: ${props => props.theme.secondary};
  font-size: 28px;
  font-style: italic;
  font-weight: 800;
`;

export default function TransactionTitle(props) {
  return <StyledTransactionTitle>{props.children}</StyledTransactionTitle>;
}
