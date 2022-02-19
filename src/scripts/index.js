// // const overlays = document.querySelectorAll(".overlay");
// const overlayForm = document.querySelector(".overlay__form");

// const profilePopup = document.querySelector(".overlay_type_profile");
// const newCardPopup = document.querySelector(".overlay_type_card-add");
// const imagePopup = document.querySelector(".overlay_type_picture");

// const profileName = document.querySelector(".profile__intro-title");
// const profileJob = document.querySelector(".profile__intro-subtitle");
// const elements = document.querySelector(".elements");

// const inputName = document.querySelector("#overlay__form-input_line-one");
// const inputJob = document.querySelector("#overlay__form-input_line-two");

// const inputCardName = document.querySelector(
//   "#overlay__form-new-card-name-input"
// );
// const inputCardImageUrl = document.querySelector(
//   "#overlay__form-new-card-url-input"
// );

// const editProfileForm = document.querySelector("#edit_form");
// const addForm = document.querySelector("#add_form");

// const overlayImage = document.querySelector(".overlay__image-popup-photo");
// const overlayImageTitle = document.querySelector(".overlay__image-popup-tilte");

// const profilePopupCloseButton = profilePopup.querySelector(
//   "#close_profile_button"
// );
// const newCardPopupCloseButton = newCardPopup.querySelector(
//   "#close_card-add_button"
// );
// const imagePopupCloseButton = imagePopup.querySelector("#close_picture_button");

// const initialCards = [
//   {
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//   },
//   {
//     name: "Холмогорский район",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//   },
// ];

// function closeFormOverlay(overlay) {
//   overlay.querySelector(".overlay__form-button").disabled = true;
//   let inputs = overlay.querySelectorAll(".overlay__form-input");
//   for (let i = 0; i < inputs.length; i++) {
//     inputs[i].classList.remove("overlay__form-input_error");
//   }
//   let errors = overlay.querySelectorAll(".overlay__form-error");
//   // console.log("errors =", errors);
//   for (let i = 0; i < errors.length; i++) {
//     errors[i].textContent = "";
//   }
//   inputCardName.value = "";
//   inputCardImageUrl.value = "";
// }

// function closeOverlay(overlayToClose) {
//   try {
//     // if closed with click
//     let overlay = overlayToClose.currentTarget.closest(".overlay");
//     overlay.classList.remove("overlay_opened");
//     if (!overlay.classList.contains("overlay_type_picture")) {
//       closeFormOverlay(overlay);
//     }
//   } catch (err) {
//     // if closed with button
//     overlayToClose.classList.remove("overlay_opened");
//     let overlay = overlayToClose.closest(".overlay");
//     if (!overlay.classList.contains("overlay_type_picture")) {
//       closeFormOverlay(overlay);
//     }
//   }
// }

// function addLike(likeButton) {
//   likeButton.currentTarget.classList.toggle("card__heart_selected");
// }

// function removeCard(card) {
//   card.currentTarget.closest(".card").remove();
// }

// // function openOverlay(openButton) {
// //   if (openButton.currentTarget.classList[0] === "profile__edit-button") {
// //     openProfilePopup();
// //   } else if (openButton.currentTarget.classList[0] === "card__image") {
// //     openImagePopup(openButton);
// //   } else {
// //     console.log("else");
// //   }
// // }

// function openOverlay(overlayToOpen) {
//   overlayToOpen.classList.add("overlay_opened");
// }

// function openProfilePopup(profilePopup) {
//   inputName.value = profileName.textContent;
//   inputJob.value = profileJob.textContent;
//   openOverlay(profilePopup);
// }

// function openNewCardPopup(newCardPopup) {
//   openOverlay(newCardPopup);
// }

// function openImagePopup(openButton) {
//   overlayImage.setAttribute("src", openButton.currentTarget.src);
//   overlayImageTitle.textContent = openButton.currentTarget.alt;
//   openOverlay(imagePopup);
// }

// function createCard(name, url) {
//   const cardTemplate = document.querySelector("#card").content;
//   const card = cardTemplate.querySelector(".card").cloneNode(true);
//   const cardImage = card.querySelector(".card__image");
//   cardImage.setAttribute("src", url);
//   cardImage.setAttribute("alt", name);
//   const cardTitle = card.querySelector(".card__title");
//   cardTitle.textContent = name;
//   const likeButton = card.querySelector(".card__heart");
//   likeButton.addEventListener("click", addLike);
//   const deleteButton = card.querySelector(".card__delete-button");
//   deleteButton.addEventListener("click", removeCard);
//   const imageButton = card.querySelector(".card__image");
//   // imageButton.addEventListener("click", openOverlay);
//   imageButton.addEventListener("click", openImagePopup);
//   return card;
// }

// for (let i = 0; i < initialCards.length; i++) {
//   const card = createCard(initialCards[i].name, initialCards[i].link);
//   elements.prepend(card);
// }

// function submitTitleChanges(submit) {
//   submit.preventDefault();
//   profileName.textContent = inputName.value;
//   profileJob.textContent = inputJob.value;
//   closeOverlay(submit);
// }

// function submitCardCreation(submit) {
//   submit.preventDefault();
//   // validateCardAdding();
//   const card = createCard(inputCardName.value, inputCardImageUrl.value);
//   elements.prepend(card);
//   closeOverlay(submit);
//   // inputCardName.value = "";
//   // inputCardImageUrl.value = "";
// }

// const editButton = document.querySelector(".profile__edit-button");
// const addButton = document.querySelector(".profile__add-button");

// profilePopupCloseButton.addEventListener("click", closeOverlay);
// newCardPopupCloseButton.addEventListener("click", closeOverlay);
// imagePopupCloseButton.addEventListener("click", closeOverlay);

// editProfileForm.addEventListener("submit", submitTitleChanges, true);
// addForm.addEventListener("submit", submitCardCreation, true);

// editButton.addEventListener("click", function () {
//   openProfilePopup(profilePopup);
// });
// addButton.addEventListener("click", function () {
//   openNewCardPopup(newCardPopup);
// });

// //
// //
// //

// let overlays = document.querySelectorAll(".overlay");
// // console.log(overlays);
// overlays.forEach((overlay) => {
//   overlay.addEventListener("click", (event) => {
//     if (event.target === event.currentTarget) {
//       closeOverlay(event);
//     }
//   });
// });

// document.addEventListener("keydown", (event) => {
//   if (event.code === "Escape") {
//     overlays.forEach((overlay) => {
//       if (overlay.classList.contains("overlay_opened")) {
//         closeOverlay(overlay);
//       }
//     });
//   }
// });
