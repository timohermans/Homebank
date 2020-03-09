// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation((...args) => {
    console.warn("window.fetch is not mocked for this call", ...args);
    return Promise.reject(new Error("This must be mocked!"));
  });
});

afterEach(() => {
  global.fetch.mockRestore();
});
