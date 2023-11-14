import { http } from "./http";

export const peticionGet = async (url) => {
  const response = await fetch(http+url, {
    method: "GET",
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
