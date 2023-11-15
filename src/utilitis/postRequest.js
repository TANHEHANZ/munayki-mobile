import { http } from "./http";

export const peticionPost = async (url, contenido) => {
  const response = await fetch(http+url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(contenido),
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return null;
};
