import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/groups/";

export function getGroups() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveGroup(group) {
  return fetch(baseUrl + (group.id || ""), {
    method: group.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(group)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteGroup(groupId) {
  return fetch(baseUrl + groupId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
