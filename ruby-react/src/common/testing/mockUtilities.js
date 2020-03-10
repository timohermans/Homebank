export function mockFetch(dataAsJsonResponse) {
  const mockFetchPromise = Promise.resolve({
    json: () => Promise.resolve(dataAsJsonResponse)
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
}

export function disableFetch() {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => new Promise((resolve, reject) => {}));
}
