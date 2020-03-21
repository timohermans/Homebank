import React, { useRef } from "react";
import styled from "styled-components";
import { animated, useTransition, useChain } from "react-spring";
import Overlay from "./Overlay";

const StyledModal = styled(animated.div)`
  background-color: ${props => props.theme.colors.section};
  border-radius: ${props => props.theme.roundedSm};
  box-shadow: ${props => props.theme.shadow};
  padding: 15px;

  @media ${props => props.theme.device.desktop} {
    max-width: 500px;
    margin: 1.75rem auto;
    width: auto;
  }

  @media ${props => props.theme.device.mobile} {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
`;

export default function Modal({
  isModalVisible,
  hideModal,
  ...props
}) {
  const overlayRef = useRef();
  const overlayTransitions = useTransition(isModalVisible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    ref: overlayRef
  });

  const modalRef = useRef();
  const modalTransitions = useTransition(isModalVisible, null, {
    from: { transform: "translate3d(0, -50px, 0)" },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: { transform: "translate3d(0, -50px, 0)" },
    ref: modalRef
  });

  useChain(isModalVisible ? [overlayRef, modalRef] : [modalRef, overlayRef], [
    0,
    0.1
  ]);

  return overlayTransitions.map(
    overlayTransition =>
      overlayTransition.item && (
        <Overlay
          hide={hideModal}
          key={overlayTransition.key}
          transition={overlayTransition.props}
        >
          {modalTransitions.map(
            modalTransition =>
              modalTransition.item && (
                <StyledModal
                  style={modalTransition.props}
                  key={modalTransition.key}
                >
                  {props.children}
                </StyledModal>
              )
          )}
        </Overlay>
      )
  );
}
