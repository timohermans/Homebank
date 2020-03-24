import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../../app/store";
import { ThemeProvider } from "styled-components";
import { theme } from "../../app/theme";

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState for the entire store that the ui is rendered with
export function renderWithReduxAndTheme(ui, { __ } = {}) {
  return {
    ...render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>{ui}</Provider>
      </ThemeProvider>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

export function renderWithTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}
