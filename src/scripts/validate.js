function showButton(submitButton) {
  submitButton.disabled = false;
}

function hideButton(submitButton) {
  submitButton.disabled = true;
}

function showInputError(inputField, inputErrorClass) {
  inputField.classList.add(inputErrorClass);
}
function hideInputError(inputField, inputErrorClass) {
  inputField.classList.remove(inputErrorClass);
}

function checkInput(event, inputErrorClass) {
  let inputField = event.currentTarget;
  var isValid = inputField.checkValidity();

  let errorMessage = inputField
    .closest(".input-group")
    .querySelector(inputField.inputSubtitleErrorClass);
  errorMessage.textContent = inputField.validationMessage;

  if (!isValid) {
    showInputError(inputField, inputErrorClass);
  } else {
    hideInputError(inputField, inputErrorClass);
  }
}

function checkForm(
  event,
  inputSubtitleErrorClass,
  inputSelector,
  formSelector,
  submitsubmitButton
) {
  let inputFields = event.currentTarget.querySelectorAll(inputSelector);
  for (let i = 0; i < inputFields.length; i++) {
    let inputField = inputFields[i];
    inputField.inputSubtitleErrorClass = inputSubtitleErrorClass;
    var isValid = inputField.checkValidity();

    let submitButton = inputField
      .closest(formSelector)
      .querySelector(submitsubmitButton);

    if (!isValid) {
      hideButton(submitButton);
      break;
    } else {
      showButton(submitButton);
    }
  }
}

export function testFunction() {
  console.log("validate.js works");
}

export function enableValidation(
  formSelector,
  inputSelector,
  submitsubmitButton,
  inputSubtitleErrorClass,
  inputErrorClass
) {
  // console.log("TEST =", this);
  // this.myFunction.bind(this);
  let forms = document.querySelectorAll(formSelector);
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("input", (event) => {
      checkForm(
        event,
        inputSubtitleErrorClass,
        inputSelector,
        formSelector,
        submitsubmitButton
      );
    });

    let inputs = forms[i].querySelectorAll(inputSelector);
    for (let j = 0; j < inputs.length; j++) {
      // inputs[j].style.color = "purple";
      // inputs[j].addEventListener("input", checkInput);
      inputs[j].addEventListener("input", (event) => {
        checkInput(event, inputErrorClass);
      });
      inputs[j].inputSubtitleErrorClass = inputSubtitleErrorClass;
    }
  }
}

// export { enableValidation as enableValidation };

// enableValidation(
//   (formSelector = ".overlay__form"),
//   (inputSelector = ".overlay__form-input"),
//   (submitsubmitButton = ".overlay__form-button"),
//   (inputSubtitleErrorClass = ".overlay__form-error"),
//   (inputErrorClass = "overlay__form-input_error")
// );
