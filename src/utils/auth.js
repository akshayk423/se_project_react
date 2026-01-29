import { baseUrl, headers, _handleServerResponse } from "./api";
import { getToken } from "./token.js";

export const signUp = (email, password, name, avatar) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(_handleServerResponse);
};

export const signIn = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(_handleServerResponse);
};

export const validateUser = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(_handleServerResponse);
};
