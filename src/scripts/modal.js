export function testModal(argument = "") {
  argument += "Modal.js works";
  console.log(argument);
}
testModal("2 ");

function clearOverlay(overlay) {
  const errors = overlay.querySelectorAll(".overlay__form-error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].textContent = "";
  }
  const inputs = overlay.querySelectorAll(".overlay__form-input");
  if (inputs.length > 0) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }
}

export function closeFormOverlay(overlay) {
  overlay.querySelector(".overlay__form-button").disabled = true;
  const inputs = overlay.querySelectorAll(".overlay__form-input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("overlay__form-input_error");
  }
  clearOverlay(overlay);
}

export function closeOverlay(overlayToClose) {
  overlayToClose.classList.remove("overlay_opened");
}

function handleEsc(event) {
  if (event.key === "Escape") {
    let overlay = document.querySelector(".overlay_opened");
    closeOverlay(overlay);
  }
}

export function openOverlay(overlayToOpen) {
  overlayToOpen.classList.add("overlay_opened");
  document.addEventListener("keydown", handleEsc);
}

const overlays = document.querySelectorAll(".overlay");
overlays.forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeOverlay(overlay);
      if (!overlay.classList.contains("overlay_type_picture")) {
        closeFormOverlay(overlay);
      }
    }
  });
});
