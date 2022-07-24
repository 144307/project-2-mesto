// default
export class Popup {
  // constructor(options) {}
  setListeners(selector) {
    // this.overlay = document.querySelector(selector);
    this.overlay = selector;

    this.overlay.addEventListener("click", (event) => {
      if (event.target === selector) {
        this.close();
      }
    });
    // const overlays = document.querySelectorAll(".overlay");
    // overlays.forEach((overlay) => {
    //   overlay.addEventListener("click", (event) => {
    //     if (event.target === overlay) {
    //       this.close();
    //     }
    //   });
    // });
  }

  resetFormErrros() {
    console.log(this.overlay);
    const errors = this.overlay.querySelectorAll(".overlay__form-error");
    for (let i = 0; i < errors.length; i++) {
      errors[i].textContent = "";
    }
    const inputs = this.overlay.querySelectorAll(".overlay__form-input");
    if (inputs.length > 0) {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("overlay__form-input_error");
        inputs[i].value = "";
      }
    }
  }

  toggleLoadingButton(submitButton, newValue) {
    // let submitButton = overlay.querySelector(".overlay__form-button");
    submitButton.value = newValue;
  }

  openFormOverlay() {
    this.overlay.querySelector(".overlay__form-button").disabled = true;
    this.resetFormErrros();
  }

  open() {
    this.overlay.classList.add("overlay_opened");
    document.addEventListener("keydown", this.handleEsc);
  }

  close() {
    console.log("popup.js close()");
    const overlay = document.querySelector(".overlay_opened");
    console.log("popup.js close() overlay", overlay);
    overlay.classList.remove("overlay_opened");
    document.removeEventListener("keydown", this.handleEsc);
    // return "close";
  }

  handleEsc(event) {
    if (event.key === "Escape") {
      this.close();
      // console.log(this.close());
      console.log("popup.js handleEsc()");
    }
  }
}

export class PopupWithImage extends Popup {
  open() {}
}

// const inputName = document.querySelector("#overlay__form-input_line-one");
// const inputJob = document.querySelector("#overlay__form-input_line-two");
// const profileName = document.querySelector(".profile__intro-title");
// const profileInfo = document.querySelector(".profile__intro-subtitle");

export class PopupWithForm extends Popup {
  constructor(overlay) {
    super();
    this.overlay = overlay;
  }
  open() {
    // document.addEventListener("keydown", this.handleEsc);
    this.overlay.querySelector(".overlay__form-button").disabled = true;
    this.resetFormErrros();
    this.overlay.classList.add("overlay_opened");
    document.addEventListener("keydown", this.handleEsc);
  }
}
