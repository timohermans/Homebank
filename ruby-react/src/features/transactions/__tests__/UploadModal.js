import React from "react";
import { renderWithReduxAndTheme } from "../../../common/testing/renderUtilities";
import UploadModal from "../components/UploadModal";
import { showUploadModal } from "../transactionsDuck";
import { uploadFile } from "../transactionsApi";
import { selectFile } from "../../../common/testing/eventUtilities";
import { act } from "react-dom/test-utils";
import { wait } from "@testing-library/react";

jest.mock("../transactionsApi");

function renderUploadModal() {
  const utils = renderWithReduxAndTheme(<UploadModal />);

  utils.store.dispatch(showUploadModal());

  return {
    ...utils,
    fileInput: () => utils.getByLabelText(/add file/i),
    fileUploadingLabel: () => utils.getByText(/uploading/i),
    fileDoneUploadingLabel: () => utils.getByText(/success/i),
    fileItem: fileName => utils.queryByText(fileName),
    removeButton: name =>
      utils.getAllByRole("button").find(button => button.name === name)
  };
}

test("Show an uploading status label for files", async () => {
  let isUploadDoneResolve;
  uploadFile.mockReturnValue(
    new Promise(resolve => (isUploadDoneResolve = resolve))
  );

  const {
    fileInput,
    fileUploadingLabel,
    fileDoneUploadingLabel
  } = renderUploadModal();

  selectFile(fileInput(), new File([], "transaction.csv"));

  expect(fileUploadingLabel()).toBeInTheDocument();

  isUploadDoneResolve();

  await wait(() => fileDoneUploadingLabel());
});

// test("can remove the file that was added", () => {
//   const { fileInput, fileItem, removeButton } = renderUploadModal();

//   selectFile(fileInput(), new File([], "transactie 1.csv"));

//   removeButton("remove-file-0").click();

//   expect(fileItem("transactie 1.csv")).not.toBeInTheDocument();
// });
