// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import useMeasure from "react-use-measure";

jest.mock("react-spring", () => ({
  useTransition: jest
    .fn()
    .mockImplementation(isVisible => [{ item: isVisible, key: "1" }]),
  useChain: jest.fn(),
  useSpring: jest.fn(),
  useTrail: jest
    .fn()
    .mockImplementation((number, options) => {
      let items = new Array(number)

      for (let i = 0; i < items.length; i++) {
        items[i] = { itemIndex: i };
      }
      
      return items;
    }),
  animated: {
    path: () => <path data-testid="ANIMATED-COMPONENT" />,
    div: props => {
      const testId = props['data-testid'] || "ANIMATED-COMPONENT";
      return (        
        <div {...props} data-testid={testId}>
          {props.children}
        </div>
      );
    }
  }
}));
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
