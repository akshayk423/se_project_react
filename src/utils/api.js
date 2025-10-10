const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const _handleServerResposne = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  }).then(_handleServerResposne);
};

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(_handleServerResposne);
};

export const deleteItem = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    headers: headers,
    method: "DELETE",
    body: JSON.stringify({
      itemId,
    }),
  }).then(_handleServerResposne);
};
