import React from "react";
import { renderWithRedux } from "../../../common/testing/renderUtilities";
import TransactionActionBar from "./TransactionActionBar";
import { waitForElementToBeRemoved } from "@testing-library/dom";
import { mockFetch } from "../../../common/testing/mockUtilities";

describe("TransactionActionBar", () => {
  it("closes the modal when a file has been uploaded", async () => {
    // arrange
    const { getByText, getByLabelText } = renderWithRedux(
      <TransactionActionBar />
    );
    mockFetch({});

    // act
    getByText(/add transactions/i).click();
    getByLabelText(/select/i).dispatchEvent(
      new Event("change", { target: { files: [new File([], "f")] } })
    );
    getByText(/upload/i).click();

    await waitForElementToBeRemoved(() => getByLabelText(/select/i));
  });
});
