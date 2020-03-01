import React from "react";
import { render } from "@testing-library/react";
import TransactionOverview from "./TransactionOverview";

test("has a header with a header", () => {
  const { getByText } = render(<TransactionOverview />);
  const headerElement = getByText(/homebank/i);
  expect(headerElement).toBeInTheDocument();
});

test("has a button to open the modal", () => {
  const { getByText } = render(<TransactionOverview />);
  const uploadButtonElement = getByText(/upload/i);

  expect(uploadButtonElement).toBeInTheDocument();
});

test("opens a modal when clicking the upload button", () => {
  const { getByText, getByLabelText } = render(<TransactionOverview />);
  getByText(/upload/i).click();

  const fileElement = getByLabelText(/select/i);
  expect(fileElement).toBeInTheDocument();
});
