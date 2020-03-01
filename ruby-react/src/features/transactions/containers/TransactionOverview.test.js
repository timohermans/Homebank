import React from "react";
import TransactionOverview from "./TransactionOverview";
import { renderWithRedux } from "../../../common/testing/renderUtilities";
import { act } from "@testing-library/react";
import { disableFetch, mockFetch } from "../../../common/testing/mockUtilities";
import { wait } from "@testing-library/dom";

beforeEach(() => {
  disableFetch();
});

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

test("uploads a file to the API when selected and saved", () => {
  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
  const imageInput = getByLabelText("choose image");
  imageInput.dispatchEvent(new Event("change", { target: { files: [file] } }));
  // Simulate.change(imageInput, { target: { files: [file] } });
});
