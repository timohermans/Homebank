import React from "react";
import { renderWithReduxAndTheme } from "../common/testing/renderUtilities";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { waitForElement } from "@testing-library/react";
import { mockFetch } from "../common/testing/mockUtilities";

jest.mock("../features/transactions/pages/TransactionOverview", () => ({
  __esModule: true,
  default: () => <div>Transaction overview</div>
}));

beforeEach(() => {
  mockFetch({});
});

test("has a header with a header", () => {
  const { getByText } = renderWithReduxAndTheme(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const headerElement = getByText(/homebank/i);
  expect(headerElement).toBeInTheDocument();
});

test("Can go to different pages", async () => {
  const { getByText } = renderWithReduxAndTheme(
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
