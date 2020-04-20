import React from "react";
import { fireEvent, wait } from "@testing-library/react";
import FileInput from "../FileInput";
import { renderWithTheme } from "../testing/renderUtilities";

function renderFileInput() {
  const utils = renderWithTheme(<FileInput />);

  return {
    ...utils,
    input: () => utils.getByLabelText(/add file/i),
    fileItem: fileName => utils.queryByText(fileName)
  };
}

test("shows the selected file after adding", async () => {
  const { input, fileItem } = renderFileInput();

  fireEvent.change(input(), {
    target: { files: [new File([], "transactie 1.csv")] }
  });

  await wait(async () => fileItem("transactie 1.csv"));
});