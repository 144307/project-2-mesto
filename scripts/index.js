const overlay = document.querySelector(".overlay");
const profileName = document.querySelector(".profile__intro-title");
const profileJob = document.querySelector(".profile__intro-subtitle");
const overlayContainer = document.querySelector(".overlay__container");
const elements = document.querySelector(".elements");

const inputName = document.querySelector("#overlay__form-input_line-one");
const inputJob = document.querySelector("#overlay__form-input_line-two");

const inputCardName = document.querySelector("#inputCardName");
const inputCardImageUrl = document.querySelector("#inputCardImageUrl");

const imagePopup = document.querySelector(".overlay__image-popup");

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
  overlay.classList.remove("overlay_opened");
  setTimeout(() => {
    overlay.style.visibility = "hidden";
  }, 200);
  form.style.display = "none";
  editForm.style.display = "none";
  imagePopup.style.display = "none";
  inputName.value = "";
  inputJob.value = "";
  form.removeEventListener("submit", submitCardCreation, true);
  editForm.removeEventListener("submit", submitTitleChanges, true);
}

function add_like(like_button) {
  like_button.currentTarget.classList.toggle("card__heart_selected");
}

function removeCard(card) {
  card.currentTarget.closest(".card").remove();
}

function exposeImage(image) {
  const overlayImage = document.querySelector(".overlay__image-popup-photo");
  const overlayImageTitle = document.querySelector(
    ".overlay__image-popup-tilte"
  );
  overlayImage.setAttribute("src", image.currentTarget.src);
  overlayImageTitle.textContent = image.currentTarget.alt;
  imagePopup.style.display = "flex";
  overlay.classList.add("overlay_opened");
  overlay.style.visibility = "visible";
}

function createCard(name, url) {
  const cardTemplate = document.querySelector("#card").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.setAttribute("src", url);
  cardImage.setAttribute("alt", name);
  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = name;
  return card;
}

for (let i = 0; i < initialCards.length; i++) {
  const card = createCard(initialCards[i].name, initialCards[i].link);
  elements.prepend(card);

  const likeButton = document.querySelector(".card__heart");
  likeButton.addEventListener("click", add_like);
  const deleteButton = document.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);
  const imageButton = document.querySelector(".card__image");
  imageButton.addEventListener("click", exposeImage);
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
  // const card = createCard(inputName.value, inputJob.value);
  const card = createCard(inputCardName.value, inputCardImageUrl.value);
  elements.prepend(card);

  const likeButton = document.querySelector(".card__heart");
  likeButton.addEventListener("click", add_like);
  const deleteButton = document.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);
  const imageButton = document.querySelector(".card__image");
  imageButton.addEventListener("click", exposeImage);

  closeOverlay();
}

function openEditButtoForm() {
  editForm.style.display = "flex";
  overlay.classList.add("overlay_opened");
  overlay.style.visibility = "visible";
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  editForm.addEventListener("submit", submitTitleChanges, true);
}

function openAddButtoForm() {
  form.style.display = "flex";
  overlay.classList.add("overlay_opened");
  overlay.style.visibility = "visible";
  // inputCardName.setAttribute("placeholder", "asdasdasdasda");
  // inputCardImageUrl.setAttribute("placeholder", "Ссылка на картинку");

  form.addEventListener("submit", submitCardCreation, true);
}

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButton = document.querySelector(".overlay__close-button");

closeButton.addEventListener("click", closeOverlay);
editButton.addEventListener("click", openEditButtoForm);
addButton.addEventListener("click", openAddButtoForm);
