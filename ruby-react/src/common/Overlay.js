import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";

const StyledOverlay = styled(animated.div)`
  background-color: ${props => props.theme.colors.shadow};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${props => props.theme.zIndex.overlay}
`;

export default function Overlay({ hide, transition, children }) {
  return (
    <StyledOverlay style={transition} onClick={hide}>
      {children}
    </StyledOverlay>
  );
}
