import { enableValidation } from "./scripts/validate.js";

import { createCard } from "./scripts/card.js";

import { openFormOverlay } from "./scripts/modal.js";
import { closeOverlay } from "./scripts/modal.js";
import { openOverlay } from "./scripts/modal.js";

import { getCards } from "./scripts/api.js";
import { getCardsAndInfo } from "./scripts/api.js";
import { changeProfile } from "./scripts/api.js";
import { addCard } from "./scripts/api.js";

import "./pages/index.css";

let owner;

const profilePopup = document.querySelector(".overlay_type_profile");
const newCardPopup = document.querySelector(".overlay_type_card-add");
const imagePopup = document.querySelector(".overlay_type_picture");

const profileAvatar = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__intro-title");
const profileInfo = document.querySelector(".profile__intro-subtitle");
const elements = document.querySelector(".elements");

const inputName = document.querySelector("#overlay__form-input_line-one");
const inputJob = document.querySelector("#overlay__form-input_line-two");

const profilePopupCloseButton = profilePopup.querySelector(
  "#close_profile_button"
);
const newCardPopupCloseButton = newCardPopup.querySelector(
  "#close_card-add_button"
);
const imagePopupCloseButton = imagePopup.querySelector("#close_picture_button");

// getCards().then((result) => {
//   // console.log("result =", result);
//   for (let i = 0; i < result.length; i++) {
//     // console.log("card owner =", result[i].owner);
//     let likes = result[i].likes.length;
//     let owned = false;
//     console.log(owner, " ", result[i].name);
//     if (owner === result[i].name) {
//       owned = true;
//     }
//     const card = createCard(result[i].name, result[i].link, likes, owned);
//     elements.prepend(card);
//   }
// });

getCardsAndInfo().then((response) => {
  // owner = response[1].name;
  owner = response[1]._id;

  for (let i = 0; i < response[0].length; i++) {
    // console.log("card owner =", result[i].owner);
    // let likes = response[0][i].likes.length;
    let owned = false;
    // let id = response[0][i]._id;
    // console.log("CardId (?) =", id);
    // console.log(owner, " ", response[0][i].owner.name);
    if (owner === response[0][i].owner._id) {
      owned = true;
    }
    const card = createCard(
      response[0][i].name,
      response[0][i].link,
      response[0][i].likes,
      owned,
      response[0][i]._id,
      owner
    );
    elements.prepend(card);
  }
  console.log("cardsData =", response[0]);

  profileName.textContent = response[1].name;
  profileInfo.textContent = response[1].about;
  // console.log("owner =", owner);
  profileAvatar.setAttribute("src", response[1].avatar);
});

const inputCardName = document.querySelector(
  "#overlay__form-new-card-name-input"
);
const inputCardImageUrl = document.querySelector(
  "#overlay__form-new-card-url-input"
);

profilePopupCloseButton.addEventListener("click", () => {
  closeOverlay();
});
newCardPopupCloseButton.addEventListener("click", () => {
  closeOverlay();
});
imagePopupCloseButton.addEventListener("click", () => {
  closeOverlay();
});

const editProfileForm = document.querySelector("#edit_form");
const addForm = document.querySelector("#add_form");

export function openProfilePopup(profilePopup) {
  openFormOverlay(profilePopup);
  inputName.value = profileName.textContent;
  inputJob.value = profileInfo.textContent;
  openOverlay(profilePopup);
}

export function openNewCardPopup(newCardPopup) {
  openFormOverlay(newCardPopup);
  openOverlay(newCardPopup);
}

function submitTitleChanges(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileInfo.textContent = inputJob.value;
  changeProfile(profileName.textContent, profileInfo.textContent);
  closeOverlay();
}

function submitCardCreation(event) {
  event.preventDefault();
  let newCardId;
  addCard(inputCardName.value, inputCardImageUrl.value).then((response) => {
    newCardId = response._id;
    console.log("added card id =", response._id);
    console.log("TEST =", newCardId);
    const card = createCard(
      inputCardName.value,
      inputCardImageUrl.value,
      0,
      true,
      newCardId
    );
    elements.prepend(card);
    closeOverlay();
  });
}

editProfileForm.addEventListener("submit", submitTitleChanges, true);
addForm.addEventListener("submit", submitCardCreation, true);

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

editButton.addEventListener("click", function () {
  openProfilePopup(profilePopup);
});
addButton.addEventListener("click", function () {
  openNewCardPopup(newCardPopup);
});

enableValidation(
  ".overlay__form",
  ".overlay__form-input",
  ".overlay__form-button",
  ".overlay__form-error",
  "overlay__form-input_error"
);

// changeProfile("Marie Skłodowska Curie", "Physicist and Chemist").then(
// changeProfile("ffffsdfsdf sdf sdf", "Physicist and Chemist").then((result) => {
//   console.log("changeProfile =", result);
// });
// addCard().then((result) => {
//   console.log("addCard =", result);
// });
