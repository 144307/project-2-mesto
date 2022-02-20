import { openImagePopup } from "./modal.js";
import { testModal } from "./modal.js";

testModal();

function addLike(likeButton) {
  likeButton.currentTarget.classList.toggle("card__heart_selected");
}

function removeCard(card) {
  card.currentTarget.closest(".card").remove();
}

export function createCard(name, url) {
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
  imageButton.addEventListener("click", openImagePopup);
  return card;
}
