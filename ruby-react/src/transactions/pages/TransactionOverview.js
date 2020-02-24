import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function TransactionOverview() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/transactions")
      .then(res => res.json())
      .then(transactions => {
        setTransactions(transactions);
      })
      .catch(error => {
        setError(<div>Getting the transactions didn't go as planned :(</div>);
      });
  }, []);

  return (
    <div>
      <h1>Transaction overview works as a beast!</h1>

      <div>
        {transactions.map(transaction => (
          <div>
            <div>{transaction.memo}</div>
            <div>{transaction.inflow}</div>
          </div>
        ))}
      </div>

      {error}
    </div>
  );
}
