import React from "react";
import TransactionOverview from "./TransactionOverview";
import { renderWithRedux } from "../../../common/testing/testingUtilities";

test("has a header with a header", () => {
  const { getByText } = renderWithRedux(<TransactionOverview />);
  const headerElement = getByText(/homebank/i);
  expect(headerElement).toBeInTheDocument();
});

test("has a button to open the modal", () => {
  const { getByText } = renderWithRedux(<TransactionOverview />);
  const uploadButtonElement = getByText(/upload/i);

  expect(uploadButtonElement).toBeInTheDocument();
});

test("opens a modal when clicking the upload button", () => {
  const { getByText, getByLabelText } = renderWithRedux(
    <TransactionOverview />
  );
  getByText(/upload/i).click();

  const fileElement = getByLabelText(/select/i);
  expect(fileElement).toBeInTheDocument();
});
