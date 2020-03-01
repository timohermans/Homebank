import React from "react";
import "bulma/css/bulma.min.css";
import "../common/utilities.css";
import TransactionOverview from "../features/transactions/containers/TransactionOverview";

function App() {
  return (
    <div className="App">
      <TransactionOverview />
    </div>
  );
}

export default App;
