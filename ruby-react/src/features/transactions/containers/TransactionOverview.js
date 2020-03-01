import * as React from "react";
import { useEffect, useState } from "react";
import TransactionHeader from "../components/TransactionHeader";

import "./TransactionOverview.css";
import TransactionActionBar from "../components/TransactionActionBar";
import TransactionList from "../components/TransactionList";
import { connect } from "react-redux";
import { hideUploadModal, showUploadModal } from "../transactionsDuck";

function TransactionOverview() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  async function getTransactions() {
    try {
      const response = await fetch("http://localhost:4000/transactions");
      console.log(`derp ${await response.json()}`);
      setTransactions(await response.json());
    } catch {
      setError(<div>Getting the transactions didn't go as planned :(</div>);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <TransactionHeader />

      <div className="container">
        <TransactionActionBar />
        <TransactionList transactions={transactions} />
      </div>

      {error}
    </div>
  );
}

export default connect(null, { showUploadModal, hideUploadModal })(
  TransactionOverview
);
