import React from "react";
import "bulma/css/bulma.min.css";
import "../common/utilities.css";
import TransactionOverview from "../features/transactions/containers/TransactionOverview";
import { Switch, Route, Link, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Transactions</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Redirect exact from="/" to="/transactions" />
        <Route path="/transactions">
          <TransactionOverview />
        </Route>
        <Route path="/categories">
          <div>hello categories</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
