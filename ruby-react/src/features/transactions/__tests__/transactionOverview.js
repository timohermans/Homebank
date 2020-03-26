import React from "react";
import TransactionOverview from '../pages/TransactionOverview';
import { renderWithReduxAndTheme } from "../../../common/testing/renderUtilities";
import { getTransactions, uploadFile } from "../transactionsApi";
import { act } from "react-dom/test-utils";
import { waitForElementToBeRemoved, fireEvent } from "@testing-library/react";

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
    fileDoneUploadingLabel: () => util.getByText(/success/i)
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

  const { uploadButton, modal, fileInput, closeModal, fileUploadingLabel, fileDoneUploadingLabel } = await renderOverview();

  uploadButton().click();

  expect(modal()).toBeInTheDocument();

  fireEvent.change(fileInput(), { target: { files: [new File([], "f")] } });

  expect(uploadFile).toHaveBeenCalled();

  // expect(fileUploadingLabel()).toBeInTheDocument();
  
  isUploadDoneResolve();
  
  // expect(fileDoneUploadingLabel()).toBeInTheDocument();

  closeModal().click();

  expect(modal()).not.toBeInTheDocument();
});

