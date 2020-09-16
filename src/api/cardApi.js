import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/cards/";

export function getCards() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCard(card) {
  return fetch(baseUrl + (card.id || ""), {
    method: card.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(card)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCard(cardId) {
  return fetch(baseUrl + cardId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
