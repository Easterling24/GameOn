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

// Fucntions responsible for validating required fields

const checkFirstName = () => {
  let valid = false;

  let min = 2, max = 25;

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
  const validConditions = document.getElementById("condition-1");

  if (!isConditionAccepted(checkbox)) {
    validConditions.setAttribute(
      "data-error",
      "Vous devez accepter les conditions"
    );
    validConditions.setAttribute("data-error-visible", true);
  } else {
    validConditions.removeAttribute("data-error");
    validConditions.setAttribute("data-error-visible", false);
    valid = true;
  }

  return valid;
};

const checkLocations = () => {
  let valid = false;
  const loc1 = document.getElementById('location1')
  const loc2 = document.getElementById('location2')
  const loc3 = document.getElementById('location3')
  const loc4 = document.getElementById('location4')
  const loc5 = document.getElementById('location5')
  const loc6 = document.getElementById('location6')
  const locationField = document.getElementById("locations");



    if (!loc1.checked && !loc2.checked && !loc3.checked && !loc4.checked && !loc5.checked && !loc6.checked ) {
      locationField.setAttribute("data-error", "Choisissez une ville");
      locationField.setAttribute("data-error-visible", true);
    } else {
      locationField.setAttribute("data-error", "");
      locationField.setAttribute("data-error-visible", false);
      valid = true;
    }
  

  return valid;
};

/*********/

// Validating functions

const isRequired = (value) => (value === "" ? false : true);
const isBeetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);};

const isConditionAccepted = (value) => (value.checked ? true : false);
const isLocationChosen = (value) => (value.checked ? true :false)

//**********//


form.addEventListener("submit", function (e) {
  // Preventing the automatic form sending 
  e.preventDefault();

  let isFirstNameValid = checkFirstName(),
    isLastNameValid = checkLastName(),
    isMailValid = checkEmail(),
    isConditionsValid = checkConditions(),
    isLocationChosen = checkLocations(),
    isNumberValid = checkNumber();

  // Verifying that all the conditions are true
  let isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isMailValid &&
    isConditionsValid &&
    isLocationChosen &&
    isNumberValid;

  // If the condition is true ( All of the variables above), assigning new props to the display message and validating the modal

  if (isFormValid) {
    form.style.display = "none";
    let msg = document.getElementById("confirmation-msg");

    msg.textContent = "Tout est pret, merci pour votre reservation !";
    msg.style.color = "white";
    msg.style.textAlign = "center";
  }
});

form.addEventListener("input", function (e) {
  // Targeting input field and adding a listener. 

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
      checkLocations();
      break;
  }
});




// Disabling Submit button while input fields are not filled

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




// enabling Burger Nav function

let burgerMenu = document.getElementById("burger-menu");
let overlay = document.getElementById("menu");

burgerMenu.addEventListener("click", function () {
  this.classList.toggle("close-menu");
  overlay.classList.toggle("overlay");
});

overlay.addEventListener("click", function (e) {
  e.stopPropagation();
});




// Assingning a function which closes the modal form

function closeModal() {
  modalbg.style.display = "none";
}

// Enabling closing modal

closeBtn.addEventListener("click", closeModal);
