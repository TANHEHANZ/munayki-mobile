import { http } from "./http";

export const peticionDelete = async (url,id) => {
  const response = await fetch(http+url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

  });
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return null;
};
