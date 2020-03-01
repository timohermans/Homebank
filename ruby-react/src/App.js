import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import "./theme/utilities.css";
import TransactionOverview from "./transactions/pages/TransactionOverview";

function App() {
  return (
    <div className="App">
      <TransactionOverview />
    </div>
  );
}

export default App;
