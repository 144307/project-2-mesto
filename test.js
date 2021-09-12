let container = document.querySelector(".container");
let songsContainer = container.querySelector(".songs-container");
let addButton = document.querySelector(".form__submit-btn_action_add");
let resetButton = document.querySelector(".form__submit-btn_action_reset");

function renderAdded() {
  let noSongsElement = container.querySelector(".no-songs");
  let songs = songsContainer.querySelectorAll(".song");
  if (songs.length === 0) {
    resetButton.setAttribute("disabled", true);
    resetButton.classList.add("form__submit-btn_disabled");
    noSongsElement.classList.remove("no-songs_hidden");
  } else {
    resetButton.removeAttribute("disabled");
    resetButton.classList.remove("form__submit-btn_disabled");
    noSongsElement.classList.add("no-songs_hidden");
  }
}

function addSong() {
  /* вставим разметку с помощью innerHTML
  Используйте обратные кавычки, чтобы разместить её
  на нескольких строчках */

  songsContainer.insertAdjacentHTML(
    "beforeend",
    `
        <div class="song">
          <h4 class="song__artist">Кино</h4>
          <p class="song__title">Дерево</p>
          <button class="song__like"></button>
        </div>
  `
  );
  renderAdded();
}

addButton.addEventListener("click", addSong);
renderAdded();
