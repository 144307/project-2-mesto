export function testModal(argument = "") {
  argument += "Modal.js works";
  console.log(argument);
}
testModal("2 ");

import { createCard } from "./card.js";

const profilePopup = document.querySelector(".overlay_type_profile");
const newCardPopup = document.querySelector(".overlay_type_card-add");
const imagePopup = document.querySelector(".overlay_type_picture");

const profileName = document.querySelector(".profile__intro-title");
const profileJob = document.querySelector(".profile__intro-subtitle");
const elements = document.querySelector(".elements");

const inputName = document.querySelector("#overlay__form-input_line-one");
const inputJob = document.querySelector("#overlay__form-input_line-two");

const overlayImage = document.querySelector(".overlay__image-popup-photo");
const overlayImageTitle = document.querySelector(".overlay__image-popup-tilte");

const inputCardName = document.querySelector(
  "#overlay__form-new-card-name-input"
);
const inputCardImageUrl = document.querySelector(
  "#overlay__form-new-card-url-input"
);

const editProfileForm = document.querySelector("#edit_form");
const addForm = document.querySelector("#add_form");

const profilePopupCloseButton = profilePopup.querySelector(
  "#close_profile_button"
);
const newCardPopupCloseButton = newCardPopup.querySelector(
  "#close_card-add_button"
);
const imagePopupCloseButton = imagePopup.querySelector("#close_picture_button");

function clearOverlay(overlay) {
  let errors = overlay.querySelectorAll(".overlay__form-error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].textContent = "";
  }
  let inputs = overlay.querySelectorAll(".overlay__form-input");
  if (inputs.length > 0) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }
  // if (overlay.classList.contains("overlay_type_card-add")) {
  //   inputCardName.value = "";
  //   inputCardImageUrl.value = "";
  // }
}

function closeFormOverlay(overlay) {
  overlay.querySelector(".overlay__form-button").disabled = true;
  let inputs = overlay.querySelectorAll(".overlay__form-input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("overlay__form-input_error");
  }
  clearOverlay(overlay);
}

export function closeOverlay(overlayToClose) {
  let overlay;
  try {
    // if closed with click
    overlay = overlayToClose.currentTarget.closest(".overlay");
    overlay.classList.remove("overlay_opened");
  } catch (err) {
    // if closed with button
    overlayToClose.classList.remove("overlay_opened");
    overlay = overlayToClose.closest(".overlay");
  }
  if (!overlay.classList.contains("overlay_type_picture")) {
    closeFormOverlay(overlay);
  }
}

function handleEsc(event, overlay) {
  if (event.key === "Escape") {
    closeOverlay(overlay);
  }
}

function openOverlay(overlayToOpen) {
  overlayToOpen.classList.add("overlay_opened");
  document.addEventListener("keydown", (event) => {
    handleEsc(event, overlayToOpen);
  });
}

export function openProfilePopup(profilePopup) {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openOverlay(profilePopup);
}

export function openNewCardPopup(newCardPopup) {
  openOverlay(newCardPopup);
}

export function openImagePopup(openButton) {
  overlayImage.setAttribute("src", openButton.currentTarget.src);
  overlayImage.setAttribute("alt", openButton.currentTarget.alt);
  overlayImageTitle.textContent = openButton.currentTarget.alt;
  openOverlay(imagePopup);
}

function submitTitleChanges(submit) {
  submit.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeOverlay(submit);
}

function submitCardCreation(submit) {
  submit.preventDefault();
  const card = createCard(inputCardName.value, inputCardImageUrl.value);
  elements.prepend(card);
  closeOverlay(submit);
}

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

profilePopupCloseButton.addEventListener("click", closeOverlay);
newCardPopupCloseButton.addEventListener("click", closeOverlay);
imagePopupCloseButton.addEventListener("click", closeOverlay);

editProfileForm.addEventListener("submit", submitTitleChanges, true);
addForm.addEventListener("submit", submitCardCreation, true);

editButton.addEventListener("click", function () {
  openProfilePopup(profilePopup);
});
addButton.addEventListener("click", function () {
  openNewCardPopup(newCardPopup);
});

let overlays = document.querySelectorAll(".overlay");
overlays.forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeOverlay(event);
    }
  });
});
