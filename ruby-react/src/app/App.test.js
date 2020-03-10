import React from "react";
import { renderWithRedux } from "../common/testing/renderUtilities";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { waitForElement } from "@testing-library/react";
import { mockFetch } from "../common/testing/mockUtilities";

jest.mock("../features/transactions/containers/TransactionOverview", () => ({
  __esModule: true,
  default: () => <div>Transaction overview</div>
}));

beforeEach(() => {
  mockFetch({});
});

test("Can go to different pages", async () => {
  const { getByText } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  getByText(/categories/i).click();

  const categoriesPage = await waitForElement(() =>
    getByText(/hello categories/i)
  );

  expect(categoriesPage).toBeInTheDocument();
});
