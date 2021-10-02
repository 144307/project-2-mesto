const overlays = document.querySelectorAll(".overlay");

const profilePopup = document.querySelector(".overlay_type_profile");
const newCardPopup = document.querySelector(".overlay_type_card-add");
const imagePopup = document.querySelector(".overlay_type_picture");

const profileName = document.querySelector(".profile__intro-title");
const profileJob = document.querySelector(".profile__intro-subtitle");
const elements = document.querySelector(".elements");

const inputName = document.querySelector("#overlay__form-input_line-one");
const inputJob = document.querySelector("#overlay__form-input_line-two");

const inputCardName = document.querySelector("#inputCardName");
const inputCardImageUrl = document.querySelector("#inputCardImageUrl");

const addForm = document.querySelector("#add_form");
const editForm = document.querySelector("#edit_form");

const overlayImage = document.querySelector(".overlay__image-popup-photo");
const overlayImageTitle = document.querySelector(".overlay__image-popup-tilte");

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

function closeOverlay() {
  for (let i = 0; i < overlays.length; i++) {
    overlays[i].classList.remove("overlay_opened");
  }
  setTimeout(() => {
    profilePopup.style.visibility = "hidden";
    newCardPopup.style.visibility = "hidden";
    imagePopup.style.visibility = "hidden";
  }, 200);
}

function addLike(likeButton) {
  likeButton.currentTarget.classList.toggle("card__heart_selected");
}

function removeCard(card) {
  card.currentTarget.closest(".card").remove();
}

function openProfilePopup() {
  profilePopup.classList.add("overlay_opened");
  profilePopup.style.visibility = "visible";
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function openNewCardPopup() {
  newCardPopup.classList.add("overlay_opened");
  newCardPopup.style.visibility = "visible";
}

function openImagePopup(openButton) {
  imagePopup.classList.add("overlay_opened");
  imagePopup.style.visibility = "visible";
  overlayImage.setAttribute("src", openButton.currentTarget.src);
  overlayImageTitle.textContent = openButton.currentTarget.alt;
}

function openOverlay(openButton) {
  inputName.value = "";
  inputJob.value = "";
  if (openButton.currentTarget.classList[0] === "profile__edit-button") {
    openProfilePopup();
  } else if (openButton.currentTarget.classList[0] === "profile__add-button") {
    openNewCardPopup();
  } else if (openButton.currentTarget.classList[0] === "card__image") {
    openImagePopup(openButton);
  } else {
    console.log("else");
  }
}

function createCard(name, url) {
  const cardTemplate = document.querySelector("#card").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.setAttribute("src", url);
  cardImage.setAttribute("alt", name);
  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = name;
  const likeButton = card.querySelector(".card__heart");
  likeButton.addEventListener("click", addLike);
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);
  const imageButton = card.querySelector(".card__image");
  imageButton.addEventListener("click", openOverlay);

  return card;
}

for (let i = 0; i < initialCards.length; i++) {
  const card = createCard(initialCards[i].name, initialCards[i].link);
  elements.prepend(card);
}

function submitTitleChanges(submit) {
  submit.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeOverlay();
}

function submitCardCreation(submit) {
  submit.preventDefault();
  console.log(submit);
  const card = createCard(inputCardName.value, inputCardImageUrl.value);
  elements.prepend(card);
  closeOverlay();
}

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const closeButtons = document.querySelectorAll(".overlay__close-button");
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", closeOverlay);
}

editForm.addEventListener("submit", submitTitleChanges, true);
addForm.addEventListener("submit", submitCardCreation, true);

editButton.addEventListener("click", openOverlay);
addButton.addEventListener("click", openOverlay);
