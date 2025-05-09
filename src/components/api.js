const cohortId = "wff-cohort-37";
const token = "fde443f4-e1c0-4be8-9027-f230183aa3f5";
const baseUrl = `https://nomoreparties.co/v1/${cohortId}`;

function request(path, method = "GET", body = null) {
  const headers = {
    authorization: token,
    "Content-Type": "application/json",
  };

  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  return fetch(`${baseUrl}/${path}`, options).then((res) => {
    if (!res.ok) {
      return res.json().then((err) => {
        const error = new Error(`Ошибка ${res.status}`);
        error.details = err;
        throw error;
      });
    }
    return res.json();
  });
}

export function getUserInfo() {
  return request("users/me");
}

export function getCards() {
  return request("cards");
}

export function addCard(name, link) {
  return request("cards", "POST", { name, link });
}

export function deleteCard(cardId) {
  return request(`cards/${cardId}`, "DELETE");
}

export function likeCard(cardId) {
  return request(`cards/likes/${cardId}`, "PUT");
}

export function unlikeCard(cardId) {
  return request(`cards/likes/${cardId}`, "DELETE");
}

export function updateUserInfo(name, about) {
  return request("users/me", "PATCH", { name, about });
}

export function updateUserAvatar(avatarLink) {
  return request("users/me/avatar", "PATCH", { avatar: avatarLink });
}

export function loadUserDataAndCards() {
  return Promise.all([getUserInfo(), getCards()]).then(([userInfo, cards]) => {
    return { userInfo, cards };
  });
}
