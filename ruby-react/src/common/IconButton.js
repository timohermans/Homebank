import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import styled from "styled-components";

export const StyledIconButton = styled.div`
  align-items: center;
  display: flex;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledButtonIcon = styled.div`
  align-items: center;
  background-color: ${props => props.backgroundColor};
  border-radius: 50%;
  color: #fff;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-right: 0.75rem;
  width: 40px;

  ${StyledIconButton}:hover & {
    background-color: ${props => props.backgroundHoverColor};
  }
`;

export default function IconButton(props) {
  return (
    <StyledIconButton className="icon-button" onClick={props.onClick}>
      <StyledButtonIcon
        className="button-icon"
        backgroundColor={props.backgroundColor}
        backgroundHoverColor={props.backgroundHoverColor}
      >
        <FontAwesomeIcon icon={props.icon} />
      </StyledButtonIcon>
      {props.children}
    </StyledIconButton>
  );
}
