import * as React from "react";
import { useEffect, useState } from "react";
import TransactionActionBar from "../components/TransactionActionBar";
import TransactionList from "../components/TransactionList";
import { PageContainer } from "../../../layout/container";
import TransactionTitle from "../components/transactionTitle";

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
      <PageContainer>
        <TransactionTitle>Overzicht</TransactionTitle>
        <TransactionActionBar />
        <TransactionList transactions={transactions} />
      </PageContainer>

      {error}
    </div>
  );
}
