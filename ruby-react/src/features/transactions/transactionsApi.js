export async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);

  await fetch("http://localhost:4000/transactions/upload", {
    method: "POST",
    body: form
  });
}

export async function getTransactions() {
    const response = await fetch("http://localhost:4000/transactions");
    return await response.json();  
}
