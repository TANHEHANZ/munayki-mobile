import { http } from "./http";

export const peticionPost = async (url, contenido, metodo, authToken) => {
  const response = await fetch(http + url, {
    method: metodo === "POST" ? "POST" : "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authToken ? authToken : "",
    },
    body: JSON.stringify(contenido),
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return response.error;
};
