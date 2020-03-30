import React from "react";
import TransactionOverview from '../pages/TransactionOverview';
import { renderWithReduxAndTheme } from "../../../common/testing/renderUtilities";
import { getTransactions, uploadFile } from "../transactionsApi";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";
import * as faker from 'faker';
import { createTransaction } from "../../../common/testing/data/transactionData";

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
    closeModal: () => util.getByText(/close/i),
    modal: () => util.queryByRole('modal'),
    fileInput: () => util.getByLabelText(/add file/i),
    fileUploadingLabel: () => util.getByText(/uploading/i),
    fileDoneUploadingLabel: () => util.getByText(/success/i),
    noTransactionsMessage: () => util.queryByText(/no transactions yet/i),
    transactionListItems: () => util.getAllByTestId("transaction-list-item")
  };
}

test("opens the modal and closes it when clicking on cancel", async () => {
  const { uploadButton, closeModal, modal } = await renderOverview();

  uploadButton().click();
  closeModal().click();

  expect(modal()).not.toBeInTheDocument();
});

test("uploads a file to the server and closes modal", async () => {
  let isUploadDoneResolve;
  uploadFile.mockReturnValue(new Promise((resolve) => isUploadDoneResolve = resolve));

  const { uploadButton, modal, fileInput, closeModal } = await renderOverview();

  uploadButton().click();

  expect(modal()).toBeInTheDocument();

  fireEvent.change(fileInput(), { target: { files: [new File([], "f")] } });

  expect(uploadFile).toHaveBeenCalled();

  isUploadDoneResolve();
  
  closeModal().click();

  expect(modal()).not.toBeInTheDocument();
});

test('Shows a message that there are no transactions yet', async () => {
  const { noTransactionsMessage } = await renderOverview();

  expect(noTransactionsMessage()).toBeInTheDocument();
});

test('Does not show a message when there are transactions', async () => {
  getTransactions.mockReturnValue(Promise.resolve([createTransaction()]))
  const { noTransactionsMessage } = await renderOverview();

  expect(noTransactionsMessage()).not.toBeInTheDocument();
});

test('shows a list of transactions', async () => {
  getTransactions.mockReturnValue(Promise.resolve([createTransaction(), createTransaction()]));
  const { transactionListItems } = await renderOverview();

  expect(transactionListItems().length).toBe(2);
});