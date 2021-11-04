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
const birthEl = document.getElementById("date");
const quantityEl = document.getElementById("quantity");
const checkBox1El = document.getElementById("checkbox1");
const optionsEl = document.getElementsByName("location");
const form = document.getElementById("submit");

// Fucntions responsible for validating required fields

const checkFirstName = () => {
  let valid = false;

  let min = 2,
    max = 25;

  const userName = firstNameEl.value.trim();

  if (!isRequired(userName)) {
    showError(firstNameEl, "Ce champ ne peut etre vide");
  } else if (!isBeetween(userName.length, min, max)) {
    showError(
      firstNameEl,
      `Le prenom doit contenir entre ${min} et ${max} characteres`
    );
  } else {
    showSuccess(firstNameEl);
    valid = true;
  }

  return valid;
};

const checkLastName = () => {
  let valid = false;

  let min = 2,
    max = 25;

  const userName = lastNameEl.value.trim();

  if (!isRequired(userName)) {
    showError(lastNameEl, "Ce champ ne peut etre vide");
  } else if (!isBeetween(userName.length, min, max)) {
    showError(
      lastNameEl,
      `Le nom doit contenir entre ${min} et ${max} characteres`
    );
  } else {
    showSuccess(lastNameEl);
    valid = true;
  }

  return valid;
};
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Ce champ ne peut etre vide");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Adresse mail non valide.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkNumber = () => {
  let valid = false;

  const num = quantityEl.value.trim();

  if (!isRequired(num)) {
    showError(quantityEl, "Choisissez un nombre");
  } else {
    valid = true;
    showSuccess(quantityEl);
  }

  return valid;
};

const checkConditions = () => {
  let valid = false;

  const checkbox = checkBox1El;

  if (!isConditionAccepted(checkbox)) {
    showError(checkBox1El, "Vous devez accepter les conditions d'utilisation");
  } else {
    showSuccess(checkBox1El);
    valid = true;
  }

  return valid;
};

const checkOptions = () => {
  let valid = false;
  const locations = optionsEl;
  let err = document.getElementById("option-err");

  for (let location of locations) {
    if (!location.checked) {
      err.textContent = "Choisissez une ville";
    } else {
      valid = true;
      err.style.display = "none";
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

const showError = (input, message) => {
  const formField = input.parentElement;

  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.add("success");
  formField.classList.remove("error");

  const error = formField.querySelector("small");
  error.textContent = "";
};

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
    isNumberValid = checkNumber();

  //Si tous les variables de verifications sont egales à ma variable de validation..
  let isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isMailValid &&
    isConditionsValid &&
    isOptionValid &&
    isNumberValid;

  // ... On verfife la conditions. Si toutes les conditions sont reunies,
  // la fonction avec l'evenement "submit" est alors enclanchée.

  if (isFormValid) {
    // alert("Here we go!");

    form.style.display = "none";

    let msg = document.getElementById("confirmation-msg");

    msg.textContent = "Tout est pret pour vous! Bonne Visite! ;)";
    msg.style.color = "green";
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
console.log(inputs);

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

let burgerMenu = document.getElementById('burger-menu')
let overlay = document.getElementById('menu')


burgerMenu.addEventListener('click', function(){

  this.classList.toggle('close-menu')
  overlay.classList.toggle('overlay')
})

overlay.addEventListener('click', function(e){
  e.stopPropagation()
})

