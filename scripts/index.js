const overlay = document.querySelector(".overlay");
const profileName = document.querySelector(".profile__intro-title");
const profileJob = document.querySelector(".profile__intro-subtitle");
const overlayContainer = document.querySelector(".overlay__container");
const elements = document.querySelector(".elements");

const inputName = document.querySelector("#overlay__form-input_line-one");
const inputJob = document.querySelector("#overlay__form-input_line-two");

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
  // const inputName = document.getElementById("overlay__form-input_line-one");
  // const inputJob = document.getElementById("overlay__form-input_line-two");
  overlay.classList.remove("overlay_opened");
  setTimeout(() => {
    overlay.style.visibility = "hidden";
  }, 200);
  form.style.display = "none";
  imagePopup.style.display = "none";
  inputName.value = "";
  inputJob.value = "";
  form.removeEventListener("submit", submit_card_creation, true);
  form.removeEventListener("submit", submit_title_changes, true);
}

function add_like(like_button) {
  like_button.currentTarget.classList.toggle("card__heart_selected");
}

function remove_card(card) {
  card.currentTarget.closest(".card").remove();
}

function expose_image(image) {
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

function create_card(name, url) {
  const card = document.createElement("div");
  card.classList.add("card");
  const card__delete_button = document.createElement("div");
  card__delete_button.classList.add("card__delete-button");
  const card__image = document.createElement("img");
  card__image.classList.add("card__image");
  card__image.setAttribute("src", url);
  card__image.setAttribute("alt", name);
  const card__title_group = document.createElement("div");
  card__title_group.classList.add("card__title-group");
  const card__title = document.createElement("h2");
  card__title.classList.add("card__title");
  card__title.textContent = name;
  const card__heart = document.createElement("button");
  card__heart.classList.add("card__heart");
  card__heart.type = "button";
  card__heart.name = "card__heart";
  card__heart.value = "";

  card.append(card__delete_button, card__image, card__title_group);
  card__title_group.append(card__title);
  card__title_group.append(card__heart);

  return card;
}

for (let i = 0; i < initialCards.length; i++) {
  const card = create_card(initialCards[i].name, initialCards[i].link);

  elements.prepend(card);

  const likeButton = document.querySelector(".card__heart");
  likeButton.addEventListener("click", add_like);
  const deleteButton = document.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", remove_card);
  const imageButton = document.querySelector(".card__image");
  imageButton.addEventListener("click", expose_image);
}

function submit_title_changes(submit) {
  submit.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeOverlay();
}

function submit_card_creation(submit) {
  submit.preventDefault();
  const card = create_card(inputName.value, inputJob.value);
  elements.prepend(card);
  closeOverlay();
}

function openEditButtoForm() {
  form.style.display = "flex";
  overlay.classList.add("overlay_opened");
  overlay.style.visibility = "visible";
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  form.addEventListener("submit", submit_title_changes, true);
}

function openAddButtoForm() {
  form.style.display = "flex";
  overlay.classList.add("overlay_opened");
  overlay.style.visibility = "visible";
  inputName.setAttribute("placeholder", "Название");
  inputJob.setAttribute("placeholder", "Ссылка на картинку");
  form.addEventListener("submit", submit_card_creation, true);
}

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButton = document.querySelector(".overlay__close-button");

closeButton.addEventListener("click", closeOverlay);
editButton.addEventListener("click", openEditButtoForm);
addButton.addEventListener("click", openAddButtoForm);
