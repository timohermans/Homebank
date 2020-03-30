import * as React from "react";
import { useEffect, useState } from "react";
import TransactionActionBar from "../components/TransactionActionBar";
import TransactionList from "../components/TransactionList";
import { PageContainer } from "../../../layout/container";
import TransactionTitle from "../components/transactionTitle";
import { getTransactions } from "../transactionsApi";
import isEmpty from "lodash/isEmpty";

export default function TransactionOverview() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  async function getApiTransactions() {
    try {
      const transactionsFetched = await getTransactions();
      setTransactions(transactionsFetched);

      if(isEmpty(transactionsFetched)) {
        setError(<div>No transactions yet</div>);
      }
      
    } catch {
      setError(<div>Getting the transactions didn't go as planned :(</div>);
    }
  }

  useEffect(() => {
    getApiTransactions();
  }, []);

  return (
    <PageContainer>
      <TransactionTitle>Overzicht</TransactionTitle>
      <TransactionActionBar />
      <TransactionList transactions={transactions} />
      {error}
    </PageContainer>
  );
}
