import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TransactionHeader from "../components/TransactionHeader";

import "./TransactionOverview.css";
import UploadIconButton from "../components/UploadIconButton";
import TransactionActionBar from "../components/TransactionActionBar";
import TransactionList from "../components/TransactionList";

export default function TransactionOverview() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  async function getTransactions() {
    try {
      const response = await fetch("http://localhost:4000/transactions");
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
       <TransactionActionBar/>
       <TransactionList/>
      </div>

      {error}
    </div>
  );
}
