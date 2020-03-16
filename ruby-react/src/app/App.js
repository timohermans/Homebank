import React from "react";
import "./App.css";
import "../common/css/utilities.css";
import TransactionOverview from "../features/transactions/pages/TransactionOverview";
import { Redirect, Route, Switch } from "react-router-dom";
import { Nav } from "../layout/nav";
import { css, ThemeProvider } from "styled-components";
import { theme } from "./theme";
import styled from "styled-components";

const StyledApp = styled.div`
  color: ${props => props.theme.colors.dark};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <Nav className={css("is-hidden-mobile")} />

        <Switch>
          <Redirect exact from="/" to="/transactions" />
          <Route path="/transactions">
            <TransactionOverview />
          </Route>
          <Route path="/categories">
            <div>hello categories</div>
          </Route>
        </Switch>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
