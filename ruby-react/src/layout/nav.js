import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const navbarHeightPx = 104;

const StyledNav = styled.div`
  align-items: center;
  background-color: ${props => props.theme.background};
  display: flex;
  height: ${navbarHeightPx}px;
  left: 0;
  padding: 40px 40px 0 40px;
  position: fixed;
  top: 0;
  width: 100%;
`;

const StyledNavBrand = styled.div`
  font-style: italic;
  font-weight: bolder;
  font-size: 1.75rem;
  color: #563d7c;
  margin-right: 3rem;
`;

const StyledNavItem = styled(Link)`
  color: ${props => props.theme.colors.dark};
  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:not(:first-child):not(:last-child) {
    margin-right: 10px;
  }
`;

export function Nav() {
  return (
    <StyledNav className="is-hidden-mobile">
      <StyledNavBrand>Homebank</StyledNavBrand>
      <StyledNavItem to="/">Transactions</StyledNavItem>
      <StyledNavItem to="/categories">Categories</StyledNavItem>
    </StyledNav>
  );
}
