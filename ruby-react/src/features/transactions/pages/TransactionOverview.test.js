import React from "react";
import TransactionOverview from "./TransactionOverview";
import { renderWithRedux } from "../../../common/testing/renderUtilities";
import { disableFetch } from "../../../common/testing/mockUtilities";

beforeEach(() => {
  disableFetch();
});

test("has a button to open the modal", () => {
  const { getByText } = renderWithRedux(<TransactionOverview />);
  const uploadButtonElement = getByText(/add transactions/i);

  expect(uploadButtonElement).toBeInTheDocument();
});

test("opens a modal when clicking the upload button", () => {
  const { getByText, getByLabelText } = renderWithRedux(
    <TransactionOverview />
  );

  getByText(/add transactions/i).click();

  const fileElement = getByLabelText(/select/i);
  expect(fileElement).toBeInTheDocument();
});
