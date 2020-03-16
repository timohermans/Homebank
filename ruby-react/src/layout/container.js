import styled from "styled-components";
import { navbarHeightPx } from "./nav";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageContainer = styled(Container)`
  max-width: ${props => props.theme.size.mobile};
  margin: 0 auto;
  padding-top: 16px;

  @media ${props => props.theme.device.mobile} {
    margin: 0 2rem ${navbarHeightPx}px;
    padding-bottom: 16px;
  }

  @media ${props => props.theme.device.desktop} {
    margin-top: ${navbarHeightPx}px;
    padding-left: 40px;
    padding-right: 40px;
  }
`;
