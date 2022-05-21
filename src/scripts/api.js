const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6/",
  headers: {
    authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function getCardsAndInfo() {
  // get cards and profile info from server
  return Promise.all([
    // fetch("https://nomoreparties.co/v1/plus-cohort-6/cards", {
    //   method: "GET",
    //   headers: {
    //     authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
    //   },
    // }).then(checkResponse),
    fetch(config.baseUrl + "/cards", {
      method: "GET",
      headers: config.headers,
    }).then(checkResponse),
    fetch(config.baseUrl + "/users/me", {
      // fetch("https://nomoreparties.co/v1/plus-cohort-6/cards", {
      method: "GET",
      headers: config.headers,
    }).then(checkResponse),
  ]);
  // .then((response) => {
  //   console.log("cardsData =", response[0]);
  //   console.log("usersData =", response[1]);
  // });
}

export function changeProfile(newName, newAbout) {
  console.log("changeProfile");
  console.log("newName =", newName);
  console.log("newAbout =", newAbout);
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  }).then(checkResponse);
}

export function addCard(name, link) {
  console.log("addCard");
  console.log("name =", name);
  console.log("link =", link);
  return fetch(config.baseUrl + "/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      // name: "Marie Skłodowska Curie",
      // name: "fffdf",
      // link: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

export function deleteCard(cardId) {
  console.log("deleteCard:", cardId);
  return fetch(config.baseUrl + "/cards/cardId", {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export function giveLike(cardId) {
  console.log("giveLike:", cardId);
  return fetch(config.baseUrl + "/cards/likes/cardId", {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

export function removeLike(cardId) {
  console.log("removeLike:", cardId);
  return fetch(config.baseUrl + "/cards/likes/cardId", {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export function updateAvatar(avatarUrl) {
  console.log("updateAvatar");
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(checkResponse);
}
