import React from "react";
import { renderWithRedux } from "../common/testing/renderUtilities";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { waitForElement } from "@testing-library/react";

test("Can go to different pages", async () => {
    const { getByText } = renderWithRedux(<MemoryRouter><App /></MemoryRouter>);

    getByText(/categories/i).click();

    const categoriesPage = await waitForElement(() => getByText(/hello categories/i));

    expect(categoriesPage).toBeInTheDocument();
});