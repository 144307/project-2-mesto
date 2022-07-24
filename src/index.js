// @ts-nocheck

// npm run build; npm run dev

// import { enableValidation } from "./scripts/validate.js";
import FormValidator from "./scripts/validate.js";
import Section from "./scripts/section.js";

// import { toggleLoadingButton } from "./scripts/modal.js";
import Modal from "./scripts/modal.js";
import { Popup, PopupWithImage, PopupWithForm } from "./scripts/popup.js";

import API from "./scripts/api.js";

import "./pages/index.css";

let owner;

import Card from "./scripts/card.js";

const profilePopup = document.querySelector(".overlay_type_profile");
const newCardPopup = document.querySelector(".overlay_type_card-add");
const imagePopup = document.querySelector(".overlay_type_picture");
const avatarEditPopup = document.querySelector(".overlay_type_avatar-edit");

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
const avatarEditPopupCloseButton = avatarEditPopup.querySelector(
  "#close_avatar-edit_button"
);

const APIconfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6",
  headers: {
    authorization: "230ea98f-ed00-4030-a408-2ee71d4ed161",
    "Content-Type": "application/json",
  },
};

const MyAPI = new API(APIconfig);
const MyModal = new Modal();
MyModal.setListeners();
const MyProfilePopupWithForm = new PopupWithForm(profilePopup);
const MyNewCardPopupWithForm = new PopupWithForm(newCardPopup);
const MyImagePopupWithImage = new PopupWithImage(imagePopup);
const MyAvatarPopupWithForm = new PopupWithForm(avatarEditPopup);

// getCardsAndInfo()
var testElements = [];
MyAPI.getInitialCards()
  .then((response) => {
    // owner = response[1].name;
    owner = response[1]._id;

    for (let i = 0; i < response[0].length; i++) {
      let owned = false;
      if (owner === response[0][i].owner._id) {
        owned = true;
      }
      // const card = createCard(
      //   response[0][i].name,
      //   response[0][i].link,
      //   response[0][i].likes,
      //   owned,
      //   response[0][i]._id,
      //   owner
      // );
      const settings = {
        name: response[0][i].name,
        link: response[0][i].link,
        likes: response[0][i].likes,
        owned: owned,
        cardId: response[0][i]._id,
        ownerId: owner,
      };

      const cardObject = new Card(settings);
      cardObject.createCard();
      testElements.push(cardObject);
      elements.prepend(cardObject.card);

      cardObject.card.logCard;
    }
    // const MySection = new Section(testElements, elements);

    profileName.textContent = response[1].name;
    profileInfo.textContent = response[1].about;
    profileAvatar.setAttribute("src", response[1].avatar);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const inputCardName = document.querySelector(
  "#overlay__form-new-card-name-input"
);
const inputCardImageUrl = document.querySelector(
  "#overlay__form-new-card-url-input"
);
const inputProfileImage = document.querySelector(
  "#overlay__form-new-profile-image-input"
);

profilePopupCloseButton.addEventListener("click", () => {
  MyModal.closePopup();
});
newCardPopupCloseButton.addEventListener("click", () => {
  MyModal.closePopup();
});
imagePopupCloseButton.addEventListener("click", () => {
  MyModal.closePopup();
});
avatarEditPopupCloseButton.addEventListener("click", () => {
  MyModal.closePopup();
});

const editProfileForm = document.querySelector("#edit_form");
const addForm = document.querySelector("#add_form");
const avatarEditForm = document.querySelector("#avatar_edit_form");

function openProfilePopup(profilePopup) {
  // MyModal.openFormOverlay(profilePopup);
  inputName.value = profileName.textContent;
  inputJob.value = profileInfo.textContent;
  // MyModal.openPopup(profilePopup);
}

// function openNewCardPopup(newCardPopup) {
//   MyModal.openFormOverlay(newCardPopup);
//   MyModal.openPopup(newCardPopup);
// }

// function openAvatarEditPopup(avatarEditPopup) {
//   MyModal.openFormOverlay(avatarEditPopup);
//   MyModal.openPopup(avatarEditPopup);
// }

function submitTitleChanges(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  MyModal.toggleLoadingButton(submitButton, "Сохранение...");
  // changeProfile(profileName.textContent, profileInfo.textContent)
  MyAPI.changeProfile(profileName.textContent, profileInfo.textContent)
    .then((response) => {
      profileName.textContent = inputName.value;
      profileInfo.textContent = inputJob.value;
      MyModal.closePopup();
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      MyModal.toggleLoadingButton(submitButton, "Сохранить");
    });
  // closePopup();
}

function submitCardCreation(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  MyModal.toggleLoadingButton(submitButton, "Создание...");
  MyAPI.addCard(inputCardName.value, inputCardImageUrl.value)
    .then((response) => {
      const newCardId = response._id;
      console.log("added card id =", response._id);
      console.log("TEST =", newCardId);

      const settings = {
        name: inputCardName.value,
        link: inputCardImageUrl.value,
        likes: 0,
        owned: true,
        cardId: newCardId,
      };

      const cardObject = new Card(settings);
      cardObject.createCard();
      elements.prepend(cardObject.card);

      // const card = createCard(
      //   inputCardName.value,
      //   inputCardImageUrl.value,
      //   0,
      //   true,
      //   newCardId
      // );
      // elements.prepend(card);
      MyModal.closePopup();
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      MyModal.toggleLoadingButton(submitButton, "Сохранить");
    });
}

function submitUpdateAvatar(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  MyModal.toggleLoadingButton(submitButton, "Сохранение...");
  MyAPI.updateAvatar(inputProfileImage.value)
    .then((response) => {
      MyModal.closePopup();
      MyModal.toggleLoadingButton(submitButton, "Сохранить");
      profileAvatar.setAttribute("src", inputProfileImage.value);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      MyModal.toggleLoadingButton(submitButton, "Сохранить");
    });
}

editProfileForm.addEventListener("submit", submitTitleChanges, true);
addForm.addEventListener("submit", submitCardCreation, true);
avatarEditForm.addEventListener("submit", submitUpdateAvatar, true);

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__avatar-overlay");

editButton.addEventListener("click", function () {
  MyProfilePopupWithForm.open();
  openProfilePopup(profilePopup);
});
addButton.addEventListener("click", function () {
  MyNewCardPopupWithForm.open();
  // openNewCardPopup(newCardPopup);
});
editAvatarButton.addEventListener("click", function () {
  MyAvatarPopupWithForm.open();
  // openAvatarEditPopup(avatarEditPopup);
});

const FormValidatorSettings = {
  formSelector: ".overlay__form",
  inputSelector: ".overlay__form-input",
  submitsubmitButton: ".overlay__form-button",
  inputSubtitleErrorClass: ".overlay__form-error",
  inputErrorClass: "overlay__form-input_error",
};

const editForm = document.querySelector("#edit_form");
const editFormInput = editForm.querySelector(".overlay__form-input");
const newCardForm = document.querySelector("#newCardForm");
const newCardFormInput = document.querySelector(".overlay__form-input");

const editValidate = new FormValidator(FormValidatorSettings, editFormInput);
editValidate.enableValidation();
const addValidate = new FormValidator(FormValidatorSettings, newCardForm);
addValidate.enableValidation();
const avatarValidate = new FormValidator(
  FormValidatorSettings,
  newCardFormInput
);
avatarValidate.enableValidation();

// const MyFormValidator = new FormValidator(FormValidatorSettings);
// MyFormValidator.enableValidation();

// enableValidation(
//   ".overlay__form",
//   ".overlay__form-input",
//   ".overlay__form-button",
//   ".overlay__form-error",
//   "overlay__form-input_error"
// );

// changeProfile("Marie Skłodowska Curie", "Physicist and Chemist").then(
// changeProfile("ffffsdfsdf sdf sdf", "Physicist and Chemist").then((result) => {
//   console.log("changeProfile =", result);
// });
// addCard().then((result) => {
//   console.log("addCard =", result);
// });
