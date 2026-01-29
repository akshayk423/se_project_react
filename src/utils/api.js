import { getToken } from "./token.js";

export const baseUrl =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? "https://api.weather-wear.zanity.net"
    : "http://localhost:3001";

export const headers = { "Content-Type": "application/json" };

export const _handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  }).then(_handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(_handleServerResponse);
};

export const deleteItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    },
    method: "DELETE",
  }).then(_handleServerResponse);
};

export const editUserProfile = (name, avatar) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(_handleServerResponse);
};

export const likeItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(_handleServerResponse);
};
export const unlikeItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(_handleServerResponse);
};

export const deleteClothingItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(_handleServerResponse);
};
