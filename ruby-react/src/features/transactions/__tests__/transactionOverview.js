import React from "react";
import TransactionOverview from '../pages/TransactionOverview';
import { renderWithReduxAndTheme } from "../../../common/testing/renderUtilities";
import { getTransactions, uploadFile } from "../transactionsApi";
import { act } from "react-dom/test-utils";
import { waitForElementToBeRemoved } from "@testing-library/react";

jest.mock("../transactionsApi");

beforeEach(() => {
  getTransactions.mockReturnValue(Promise.resolve([]));
});

async function renderOverview() {
  let util;

  await act(async () => util = renderWithReduxAndTheme(<TransactionOverview />));

  return {
    ...util,
    uploadButton: () => util.getByText(/add transactions/i),
    modal: () => util.getByRole('modal'),
    fileInput: () => util.getByLabelText(/select/i),
    submitFileButton: () => util.getByText(/upload/i)
  };
}

test("uploads a file to the server and closes modal", async () => {
  uploadFile.mockReturnValue(Promise.resolve({}));

  const { uploadButton, modal, fileInput, submitFileButton } = await renderOverview();

  uploadButton().click();

  expect(modal()).toBeInTheDocument();

  fileInput().dispatchEvent(
    new Event("change", { target: { files: [new File([], "f")] } })
  );

  submitFileButton().click();

  await waitForElementToBeRemoved(() => modal());
});

