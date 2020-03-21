import {renderWithRedux} from "../../../common/testing/renderUtilities";
import React from "react";
import {mockFetch} from "../../../common/testing/mockUtilities";
import UploadModal from "./UploadModal";

jest.mock('react-spring', () => ({
  useTransition: jest.fn().mockImplementation((isVisible) => ([{item: true, key: '1'}])),  
  useChain: jest.fn(),  
  animated: {
    path: () => <path data-testid="ANIMATED-COMPONENT" />,
    div: (props) => <div data-testid="ANIMATED-COMPONENT">{props.children}</div>
  }
}));

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
      body: expect.any(FormData)
    }
  );
  expect(global.fetch.mock.calls[0][1].body.has('file')).toEqual(true);
});
