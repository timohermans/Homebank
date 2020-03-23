// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import useMeasure from "react-use-measure";

jest.mock("react-use-measure");

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation((...args) => {
    console.warn("window.fetch is not mocked for this call", ...args);
    return Promise.reject(new Error("This must be mocked!"));
  });
  useMeasure.mockImplementation(() => [null, { height: 0 }]);
});

afterEach(() => {
  global.fetch.mockRestore();
  useMeasure.mockRestore();
});
