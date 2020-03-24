import React from "react";
import { renderWithTheme } from "../testing/renderUtilities";
import Modal from "../Modal";
import { act } from "react-dom/test-utils";

function renderModal() {
  const hideModalFn = jest.fn();

  const util = renderWithTheme(
    <Modal isModalVisible={true} hideModal={hideModalFn}>
      <h1>This is a modal</h1>
    </Modal>
  );

  return {
    header: util.getByText(/this is a modal/i),
    overlay: util.getByRole("overlay"),
    hideModalFn
  };
}

test("does not hide the modal when clicking on the header", () => {
  const { header, hideModalFn } = renderModal();

  header.click();

  expect(hideModalFn).not.toHaveBeenCalled();
});

test("hides the modal when clicking on the overlay", async () => {
  const { overlay, hideModalFn } = renderModal();

  overlay.click();

  expect(hideModalFn).toHaveBeenCalled();
});
