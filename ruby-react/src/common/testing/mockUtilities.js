export function mockFetch(dataAsJsonResponse) {
  const mockJsonPromise = Promise.resolve(dataAsJsonResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(async () => mockFetchPromise);
}

export function disableFetch() {
  jest.spyOn(global, "fetch").mockImplementation(() => new Promise());
}
