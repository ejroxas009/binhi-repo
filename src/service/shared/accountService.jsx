import http from "./http";

export function addAccount(account) {
  return http.post("/account/register", account);
}

export function getAllAccount() {
  return http.get("/account");
}

export async function createAccount(data) {
  const response = await fetch("http://localhost:8080/api/account/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}
