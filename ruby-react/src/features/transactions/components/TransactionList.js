import * as React from "react";

export default function TransactionList(props) {
  return (
    <div>
      {props.transactions.map(transaction => (
        <div key={transaction.id}>
          <div>{transaction.memo}</div>
          <div>{transaction.inflow}</div>
        </div>
      ))}
    </div>
  );
}
