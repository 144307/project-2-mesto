export function getCards() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-6/cards", {
    // return fetch("https://nomoreparties.co/v1/plus-cohort-6/users/me", {
    method: "GET",
    headers: {
      authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка");
  });
  // .then((result) => {
  //   console.log("result =", result);
  //   return result;
  // });
}

export function getCardsAndInfo() {
  // get cards and profile info from server
  return Promise.all([
    fetch("https://nomoreparties.co/v1/plus-cohort-6/cards", {
      method: "GET",
      headers: {
        authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    }),
    fetch("https://nomoreparties.co/v1/plus-cohort-6/users/me", {
      // fetch("https://nomoreparties.co/v1/plus-cohort-6/cards", {
      method: "GET",
      headers: {
        authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    }),
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
  return fetch("https://nomoreparties.co/v1/plus-cohort-6/users/me", {
    method: "PATCH",
    headers: {
      authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // name: "Marie Skłodowska Curie",
      name: newName,
      // name: "fffdf ffff ffff",
      // about: "Physicist and Chemist",
      about: newAbout,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject("Ошибка");
  });
}

export function addCard(name, link) {
  console.log("addCard");
  console.log("name =", name);
  console.log("link =", link);
  return fetch("https://nomoreparties.co/v1/plus-cohort-6/cards", {
    method: "POST",
    headers: {
      authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // name: "Marie Skłodowska Curie",
      // name: "fffdf",
      // link: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка");
  });
}

export function deleteCard(cardId) {
  console.log("deleteCard:", cardId);
  return fetch("https://nomoreparties.co/v1/plus-cohort-6/cards/" + cardId, {
    method: "DELETE",
    headers: {
      authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка", res);
  });
}

export function giveLike(cardId) {
  console.log("giveLike:", cardId);
  return fetch(
    "https://nomoreparties.co/v1/plus-cohort-6/cards/likes/" + cardId,
    {
      method: "PUT",
      headers: {
        authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка", res);
  });
}

export function removeLike(cardId) {
  console.log("removeLike:", cardId);
  return fetch(
    "https://nomoreparties.co/v1/plus-cohort-6/cards/likes/" + cardId,
    {
      method: "DELETE",
      headers: {
        authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка", res);
    })
    .catch((error) => {
      console.log(error);
    });
}

// export function testDeleting(cardId) {
//   return fetch("https://nomoreparties.co/v1/plus-cohort-6/cards/" + cardId, {
//     method: "DELETE",
//     headers: {
//       authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
//     },
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject("Ошибка", res);
//   });
// }

export function updateAvatar() {
  // PATCH https://nomoreparties.co/v1/cohortId/users/me/avatar
}