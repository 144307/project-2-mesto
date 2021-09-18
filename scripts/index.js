let overlay = document.querySelector(".overlay");
let profile_name = document.querySelector(".profile__intro-title");
let profile_job = document.querySelector(".profile__intro-subtitle");
let overlay_container = document.querySelector(".overlay__container");

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

function overlay_close() {
  console.log("overlay_close");
  let overlay_popup = document.querySelector(".overlay__image-popup");

  overlay.classList.remove("overlay_opened");
  // overlay.style.visibility = "visible";
  setTimeout(() => {
    overlay.classList.remove("overlay_opened");
    overlay.style.visibility = "hidden";
    if (typeof form !== "undefined") {
      form.remove();
    } else if (typeof overlay_popup !== "undefined") {
      overlay_popup.remove();
    }
  }, 200);
}

function add_like() {
  this.classList.toggle("card__heart_selected");
}

function remove_card() {
  console.log(this.closest(".card"));
  this.closest(".card").remove();
}

function expose_image() {
  // overlay_container.style.visibility = "visible";
  overlay.classList.add("overlay_opened");
  overlay.style.visibility = "visible";
  // overlay.style.opacity = "1";
  overlay_container.insertAdjacentHTML(
    "beforeend",
    `
  <div class="overlay__image-popup">
    <img class="overlay__image-popup-photo" src="${this.src}" />
    <div class="overlay__image-popup-tilte">
    overlay__image-popup-tilte
    </div>
  </div>
`
  );

  // visibility: hidden;
  // opacity: 0;
  // transition: visibility 0.3s linear,opacity 0.3s linear;

  // let overlay_popup = document.querySelector(".overlay__image-popup");
  // console.log("overlay_popup =", overlay_popup);
}

function create_card(name, url) {
  let elements = document.querySelector(".elements");
  elements.insertAdjacentHTML(
    "afterbegin",
    `
<div class="card">
  <div class="card__delete-button"></div>
  <img class="card__image" src="${url}" alt="" />
  <div class="card__title-group">
    <h2 class="card__title">${name}</h2>
    <button
      class="card__heart"
      type="button"
      name="card__heart"
      value=""
    ></button>
  </div>
</div>
`
  );
  let like_buttons = document.querySelectorAll(".card__heart");
  like_buttons.forEach(function (like_button) {
    like_button.addEventListener("click", add_like);
  });
  let delete_buttons = document.querySelectorAll(".card__delete-button");
  delete_buttons.forEach(function (delete_button) {
    delete_button.addEventListener("click", remove_card);
  });
  let image_buttons = document.querySelectorAll(".card__image");
  image_buttons.forEach(function (image_button) {
    image_button.addEventListener("click", expose_image);
  });
}

for (let i = 0; i < initialCards.length; i++) {
  create_card(initialCards[i].name, initialCards[i].link);
}

function submit_title_changes(submit) {
  submit.preventDefault();
  let input_name = document.getElementById("overlay__form-input_line-one");
  let input_job = document.getElementById("overlay__form-input_line-two");
  profile_name.innerHTML = input_name.value;
  profile_job.innerHTML = input_job.value;
  overlay.classList.remove("overlay_opened");
  overlay_close();
}

function submit_card_creation(submit) {
  submit.preventDefault();
  let input_name = document.getElementById("overlay__form-input_line-one");
  let input_job = document.getElementById("overlay__form-input_line-two");
  create_card(input_name.value, input_job.value);
  input_name.value = "";
  input_job.value = "";
  overlay.classList.remove("overlay_opened");
  overlay_close();
}

function edit_button_func() {
  overlay.classList.add("overlay_opened");
  overlay.style.visibility = "visible";
  overlay_container.insertAdjacentHTML(
    "beforeend",
    `
<form class="overlay__form" name="form">
  <h2 class="overlay__form-title overlay__form-width">
    Редактировать профиль
  </h2>
  <input
    class="overlay__form-input overlay__form-width"
    type="text"
    id="overlay__form-input_line-one"
    name="overlay__form-input_line-one"
    placeholder=""
    required=""
    autocomplete="off"
  />
  <input
    class="overlay__form-input overlay__form-width"
    type="text"
    id="overlay__form-input_line-two"
    name="overlay__form-input_line-two"
    placeholder=""
    required=""
    autocomplete="off"
  />
  <input
    class="overlay__form-button overlay__form-width"
    type="submit"
    name="overlay__form-button"
    value="Сохранить"
  />
</form>
`
  );
  let input_name = document.getElementById("overlay__form-input_line-one");
  let input_job = document.getElementById("overlay__form-input_line-two");
  input_name.value = profile_name.textContent;
  input_job.value = profile_job.textContent;
  // let form = document.querySelector(".overlay__form");
  form.addEventListener("submit", submit_title_changes, true);
}

function add_button_func() {
  overlay.classList.add("overlay_opened");
  overlay.style.visibility = "visible";
  overlay_container.insertAdjacentHTML(
    "beforeend",
    `
<form class="overlay__form" name="form">
  <h2 class="overlay__form-title overlay__form-width">
    Новое место
  </h2>
  <input
    class="overlay__form-input overlay__form-width"
    type="text"
    id="overlay__form-input_line-one"
    name="overlay__form-input_line-one"
    placeholder=""
    required=""
    autocomplete="off"
  />
  <input
    class="overlay__form-input overlay__form-width"
    type="text"
    id="overlay__form-input_line-two"
    name="overlay__form-input_line-two"
    placeholder=""
    required=""
    autocomplete="off"
  />
  <input
    class="overlay__form-button overlay__form-width"
    type="submit"
    name="overlay__form-button"
    value="Создать"
  />
</form>
`
  );
  let input_name = document.getElementById("overlay__form-input_line-one");
  let input_job = document.getElementById("overlay__form-input_line-two");
  input_name.setAttribute("placeholder", "Название");
  input_job.setAttribute("placeholder", "Ссылка на картинку");
  // let form = document.querySelector(".overlay__form");
  form.addEventListener("submit", submit_card_creation, true);
}

let edit_button = document.querySelector(".profile__edit-button");
let add_button = document.querySelector(".profile__add-button");
let close_button = document.querySelector(".overlay__close-button");

close_button.addEventListener("click", overlay_close);
edit_button.addEventListener("click", edit_button_func);
add_button.addEventListener("click", add_button_func);
