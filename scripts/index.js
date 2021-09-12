let edit_button = document.querySelector(".profile__edit-button");
let overlay = document.querySelector(".overlay");
let profile_name = document.querySelector(".profile__intro-title");
let profile_job = document.querySelector(".profile__intro-subtitle");
let close_button = document.querySelector(".overlay__close-button");
let submit_button = document.querySelector(".overlay__form-button");
let form = document.querySelector(".overlay__form");

function edit_button_func() {
  console.log("profile__edit-button");
  overlay.classList.add("overlay_opened");
  let input_name = document.getElementById("overlay__form-input_line-one");
  let input_job = document.getElementById("overlay__form-input_line-two");
  input_name.value = profile_name.textContent;
  input_job.value = profile_job.textContent;
}

function overlay_close_button() {
  console.log("overlay_close_button");
  let input_name = document.getElementById("overlay__form-input_line-one");
  let input_job = document.getElementById("overlay__form-input_line-two");
  input_name.value = "";
  input_job.value = "";
  overlay.classList.remove("overlay_opened");
}

function submit_title_changes(submit) {
  submit.preventDefault();
  let input_name = document.getElementById("overlay__form-input_line-one");
  let input_job = document.getElementById("overlay__form-input_line-two");
  profile_name.innerHTML = input_name.value;
  profile_job.innerHTML = input_job.value;
  overlay.classList.remove("overlay_opened");
}

edit_button.addEventListener("click", edit_button_func);
close_button.addEventListener("click", overlay_close_button);
form.addEventListener("submit", submit_title_changes, true);

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
  // console.log(initialCards[i].name, initialCards[i].link);
  let elements = document.querySelector(".elements");
  elements.insertAdjacentHTML(
    "afterbegin",
    `<div class="card">
  <img
    class="card__image"
    src="${initialCards[i].link}"
    alt="Карачаевск"
  />
  <div class="card__title-group">
    <h2 class="card__title">${initialCards[i].name}</h2>
    <button
      class="card__heart"
      type="button"
      name="card__heart"
      value=""
    ></button>
  </div>
</div>`
  );
}
