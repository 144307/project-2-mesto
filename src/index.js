import { enableValidation } from "./scripts/validate.js";

import { createCard } from "./scripts/card.js";

import { closeFormOverlay } from "./scripts/modal.js";
import { closeOverlay } from "./scripts/modal.js";
import { openOverlay } from "./scripts/modal.js";

import "./pages/index.css";

const profilePopup = document.querySelector(".overlay_type_profile");
const newCardPopup = document.querySelector(".overlay_type_card-add");
const imagePopup = document.querySelector(".overlay_type_picture");

const profileName = document.querySelector(".profile__intro-title");
const profileJob = document.querySelector(".profile__intro-subtitle");
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

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

for (let i = 0; i < initialCards.length; i++) {
  const card = createCard(initialCards[i].name, initialCards[i].link);
  elements.prepend(card);
}

const inputCardName = document.querySelector(
  "#overlay__form-new-card-name-input"
);
const inputCardImageUrl = document.querySelector(
  "#overlay__form-new-card-url-input"
);

profilePopupCloseButton.addEventListener("click", (event) => {
  closeOverlay(event.currentTarget.closest(".overlay"));
  closeFormOverlay(event.currentTarget.closest(".overlay"));
});
newCardPopupCloseButton.addEventListener("click", (event) => {
  closeOverlay(event.currentTarget.closest(".overlay"));
  closeFormOverlay(event.currentTarget.closest(".overlay"));
});
imagePopupCloseButton.addEventListener("click", (event) => {
  closeOverlay(event.currentTarget.closest(".overlay"));
});

const editProfileForm = document.querySelector("#edit_form");
const addForm = document.querySelector("#add_form");

export function openProfilePopup(profilePopup) {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openOverlay(profilePopup);
}

export function openNewCardPopup(newCardPopup) {
  openOverlay(newCardPopup);
}

function submitTitleChanges(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeOverlay(event.currentTarget.closest(".overlay"));
  closeFormOverlay(event.currentTarget.closest(".overlay"));
}

function submitCardCreation(event) {
  event.preventDefault();
  const card = createCard(inputCardName.value, inputCardImageUrl.value);
  elements.prepend(card);
  closeOverlay(event.currentTarget.closest(".overlay"));
  closeFormOverlay(event.currentTarget.closest(".overlay"));
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
