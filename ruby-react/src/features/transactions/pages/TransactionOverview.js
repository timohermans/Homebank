import * as React from "react";
import { useEffect, useState } from "react";
import TransactionActionBar from "../components/TransactionActionBar";
import TransactionList from "../components/TransactionList";
import { PageContainer } from "../../../layout/container";
import TransactionTitle from "../components/transactionTitle";
import { getTransactions } from "../transactionsApi";

export default function TransactionOverview() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  async function getApiTransactions() {
    try {
      const transactions = await getTransactions();
      setTransactions(transactions);
    } catch {
      setError(<div>Getting the transactions didn't go as planned :(</div>);
    }
  }

  useEffect(() => {
    getApiTransactions();
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
