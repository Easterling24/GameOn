// function editNav() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += "responsive";
//   } else {
//     x.className = "topnav";
//   }
// }

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.getElementById("close");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Identifying the tag which acts as button

closeBtn.addEventListener("click", closeModal);

// Assingning a function which closes the modal form

function closeModal() {
  modalbg.style.display = "none";
}

// Registration Form Elements

const firstNameEl = document.getElementById("first");
const lastNameEl = document.getElementById("last");
const emailEl = document.getElementById("email");
const birthEl = document.getElementById("birthdate");
const quantityEl = document.getElementById("quantity");
const checkBox1El = document.getElementById("checkbox1");
const optionsEl = document.getElementsByName("location");
const form = document.getElementById("submit");
const formDataEl = document.querySelector(".formData");

// console.log(formDataEl[0])

// Fucntions responsible for validating required fields

const checkFirstName = () => {
  let valid = false;

  let min = 2,
    max = 25;

  const userName = firstNameEl.value.trim();
  const firstName = document.getElementById("first-name");

  if (!isRequired(userName)) {
    firstName.setAttribute("data-error", "Ce champ ne peut pas etre vide");
    firstName.setAttribute("data-error-visible", true);
  } else if (!isBeetween(userName.length, min, max)) {
    firstName.setAttribute(
      "data-error",
      "Veuillez entrer minimum 2 charactères"
    );
    firstName.setAttribute("data-error-visible", true);
  } else {
    firstName.removeAttribute("data-error");
    firstName.setAttribute("data-error-visible", false);
    valid = true;
  }

  return valid;
};

const checkLastName = () => {
  let valid = false;

  let min = 2,
    max = 25;

  const userName = lastNameEl.value.trim();
  const lastName = document.getElementById("last-name");

  if (!isRequired(userName)) {
    lastName.setAttribute("data-error", "Ce champ ne peut pas etre vide");
    lastName.setAttribute("data-error-visible", true);
  } else if (!isBeetween(userName.length, min, max)) {
    lastName.setAttribute(
      "data-error",
      "Veuilllez entrer minimum 2 charactères"
    );
    lastName.setAttribute("data-error-visible", true);
  } else {
    lastName.removeAttribute("data-error");
    lastName.setAttribute("data-error-visible", false);
    valid = true;
  }

  return valid;
};
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  const emailField = document.getElementById("email-field");
  if (!isRequired(email)) {
    emailField.setAttribute("data-error", "Ce champ ne peut pas etre vide");
    emailField.setAttribute("data-error-visible", true);
  } else if (!isEmailValid(email)) {
    emailField.setAttribute("data-error", "Email n'est pas valide");
    emailField.setAttribute("data-error-visible", true);
  } else {
    emailField.removeAttribute("data-error");
    emailField.setAttribute("data-error-visible", false);

    valid = true;
  }
  return valid;
};



const checkNumber = () => {
  let valid = false;

  const num = quantityEl.value.trim();
  const city = document.getElementById("city");

  if (!isRequired(num)) {
    city.setAttribute("data-error", "Entrez un nombre");
    city.setAttribute("data-error-visible", true);
  } else {
    valid = true;
    city.removeAttribute("data-error");
    city.setAttribute("data-error-visible", false);
  }

  return valid;
};

// Checkboxes and Conditions

const checkConditions = () => {
  let valid = false;

  const checkbox = checkBox1El;
  const validConditions = document.getElementById('condition-1')

  if (!isConditionAccepted(checkbox)) {

    validConditions.setAttribute("data-error", "Vous devez accepter les conditions");
    validConditions.setAttribute('data-error-visible', true)
  } else {
    validConditions.removeAttribute("data-error")
    validConditions.setAttribute('data-error-visible', false)
    valid = true;
  }

  return valid;
};

const checkOptions = () => {
  let valid = false;
  const locations = optionsEl;

  const locationField = document.getElementById('locations')

  for (let location of locations) {
    if (!location.checked) {
      locationField.setAttribute('data-error', 'Choisissez une ville')
      locationField.setAttribute('data-error-visible', true)
    } else if(location.checked)
    
    {
      locationField.removeAttribute('data-error')
      locationField.removeAttribute('data-error-visible')
      valid = true;
    }
  }

  return valid;
};

// Rules which are applied when a field is being verified

const isRequired = (value) => (value === "" ? false : true);

const isBeetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isConditionAccepted = (value) => (value.checked ? true : false);

// Messages dispalying either error or success

// const showError = (input, message) => {
//   const formField = input.parentElement;

//   formField.classList.remove("success");
//   formField.classList.add("error");

//   const error = formField.querySelector("small");
//   error.textContent = message;
// };

// const showSuccess = (input) => {
//   const formField = input.parentElement;

//   formField.classList.add("success");
//   formField.classList.remove("error");

//   const error = formField.querySelector("small");
//   error.textContent = "";
// };

form.addEventListener("submit", function (e) {
  // On bloque l'envoi automatique du formulaire en applicant preventDefault()
  e.preventDefault();

  // On assigne a des variables suivantes, les finctions des validations listés
  // ci-dessus qui permetter de valider les champs en question.

  let isFirstNameValid = checkFirstName(),
    isLastNameValid = checkLastName(),
    isMailValid = checkEmail(),
    isConditionsValid = checkConditions(),
    isOptionValid = checkOptions(),
    isNumberValid = checkNumber()
  

  //Si tous les variables de verifications sont egales à ma variable de validation..
  let isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isMailValid &&
    isConditionsValid &&
    isOptionValid &&
    isNumberValid 
 

  // ... On verfife la conditions. Si toutes les conditions sont reunies,
  // la fonction avec l'evenement "submit" est alors enclanchée.

  if (isFormValid) {

    form.style.display = "none";

    let msg = document.getElementById("confirmation-msg");

    msg.textContent = "Tout est pret, merci pour votre reservation !";
    msg.style.color = "white";
    msg.style.textAlign = "center";
  }
});

form.addEventListener("input", function (e) {
  // On identifie les selecteurs par leur nom et on applique les fonctions de validation
  // alors que l'utilisateur entre ses données. De cette façon, on apporte un feedback direct.

  switch (e.target.name) {
    case "first":
      checkFirstName();
      break;
    case "last":
      checkLastName();
      break;
    case "email":
      checkEmail();
      break;

    case "quantity":
      checkNumber();
      break;
    case "checkbox1":
      checkConditions();
      break;
    case "location":
      checkOptions();
      break;
  }
});

// Disabling the submit button when at least one field isnt filled

let btn = document.getElementById("btn");

let inputs = document.getElementsByClassName("text-control");

const handleDisabled = () => {
  for (let input of inputs) {
    if (input.value == "") {
      btn.disabled = true;
      btn.style.background = "gray";
    } else {
      btn.disabled = false;
      btn.style.background = "red";
    }
  }
};

for (let input of inputs) {
  input.addEventListener("input", handleDisabled);
}

handleDisabled();

// enabling Burget Nav function

let burgerMenu = document.getElementById("burger-menu");
let overlay = document.getElementById("menu");

burgerMenu.addEventListener("click", function () {
  this.classList.toggle("close-menu");
  overlay.classList.toggle("overlay");
});

overlay.addEventListener("click", function (e) {
  e.stopPropagation();
});
