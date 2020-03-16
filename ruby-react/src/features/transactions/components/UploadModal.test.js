import {renderWithRedux} from "../../../common/testing/renderUtilities";
import React from "react";
import {mockFetch} from "../../../common/testing/mockUtilities";
import UploadModal from "./UploadModal";

beforeEach(() => {
  mockFetch({});
});

test("uploads a file to the API when selected and saved", async () => {
  // arrange
  const { getByText, getByLabelText } = renderWithRedux(<UploadModal />);

  mockFetch({});
  const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
  const fileInput = getByLabelText(/select/i);

  // act
  fileInput.dispatchEvent(new Event("change", { target: { files: [file] } }));
  getByText(/upload/i).click();

  // assert
  const formData = new FormData();
  formData.append("file", file);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining("/transactions/upload"),
    {
      method: "POST",
      body: formData
    }
  );
});
