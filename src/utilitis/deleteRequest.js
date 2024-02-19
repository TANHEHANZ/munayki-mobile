import { http } from "./http";

export const peticionDelete = async (url,tokenLoguet) => {
  const response = await fetch(http+url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: tokenLoguet ? tokenLoguet : "",
    },

  });
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return null;
};
