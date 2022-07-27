import Popup from "./popup";

const overlayImage = document.querySelector(".overlay__image-popup-photo");
const overlayImageTitle = document.querySelector(".overlay__image-popup-tilte");

export default class PopupWithImage extends Popup {
  // constructor(selector) {
  //   super();
  //   this.overlay = selector;
  // }
  open(imageSettings) {
    overlayImage.setAttribute("src", imageSettings.src);
    overlayImage.setAttribute("alt", imageSettings.alt);
    overlayImageTitle.textContent = imageSettings.alt;
    super.open();
    // this.overlay.classList.add("overlay_opened");
    // document.addEventListener("keydown", this._handleEscClose);
  }
}
