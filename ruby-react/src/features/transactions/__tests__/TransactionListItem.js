import React from 'react'
import TransactionListItem from "../components/TransactionListItem";
import { createTransaction } from '../../../common/testing/data/transactionData';
import { renderWithTheme } from '../../../common/testing/renderUtilities';

function renderTransactionListItem(transaction) {
    transaction = transaction || createTransaction();
    const utils = renderWithTheme(<TransactionListItem transaction={transaction}/>);

    return {
        ...utils,
        itemRow: () => utils.getByTestId("transaction-list-item")
    }
}

test("shows minimal info in the row", () => {
  const { getByText } = renderTransactionListItem({
      id: 1,
      payee: 'Timo',
      memo: 'geld buffer',
      date: '2020-01-01',
      inflow: "100.25",
      outflow: null
  });

  expect(getByText(/100.25/i)).toBeInTheDocument();
  expect(getByText(/Timo/i)).toBeInTheDocument();
  expect(getByText(/2020-01-01/i)).toBeInTheDocument();
});

// test("clicking on the row makes it expand with more detailed info", () => {
//     const { itemRow } = renderTransactionListItem()

//     itemRow.click();
// });

// test("clicking the row a second time closes the detailed info");
