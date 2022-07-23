export default class Modal {
  // constructor(options) {}
  setListeners() {
    const overlays = document.querySelectorAll(".overlay");
    overlays.forEach((overlay) => {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          this.closePopup();
        }
      });
    });
  }

  resetFormErrros(overlay) {
    console.log(overlay);
    const errors = overlay.querySelectorAll(".overlay__form-error");
    for (let i = 0; i < errors.length; i++) {
      errors[i].textContent = "";
    }
    const inputs = overlay.querySelectorAll(".overlay__form-input");
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

  openFormOverlay(overlay) {
    overlay.querySelector(".overlay__form-button").disabled = true;
    this.resetFormErrros(overlay);
  }

  openPopup(overlayToOpen) {
    overlayToOpen.classList.add("overlay_opened");
    document.addEventListener("keydown", this.handleEsc);
  }

  closePopup() {
    const overlay = document.querySelector(".overlay_opened");
    overlay.classList.remove("overlay_opened");
    document.removeEventListener("keydown", this.handleEsc);
  }

  handleEsc(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }
}

// function resetFormErrros(overlay) {
//   console.log(overlay);
//   const errors = overlay.querySelectorAll(".overlay__form-error");
//   for (let i = 0; i < errors.length; i++) {
//     errors[i].textContent = "";
//   }
//   const inputs = overlay.querySelectorAll(".overlay__form-input");
//   if (inputs.length > 0) {
//     for (let i = 0; i < inputs.length; i++) {
//       inputs[i].classList.remove("overlay__form-input_error");
//       inputs[i].value = "";
//     }
//   }
// }

// export function toggleLoadingButton(submitButton, newValue) {
//   // let submitButton = overlay.querySelector(".overlay__form-button");
//   submitButton.value = newValue;
// }

// export function openFormOverlay(overlay) {
//   overlay.querySelector(".overlay__form-button").disabled = true;
//   resetFormErrros(overlay);
// }

// function handleEsc(event) {
//   if (event.key === "Escape") {
//     closePopup();
//   }
// }

// export function openPopup(overlayToOpen) {
//   overlayToOpen.classList.add("overlay_opened");
//   document.addEventListener("keydown", handleEsc);
// }

// const overlays = document.querySelectorAll(".overlay");
// overlays.forEach((overlay) => {
//   overlay.addEventListener("click", (event) => {
//     if (event.target === overlay) {
//       closePopup();
//     }
//   });
// });
