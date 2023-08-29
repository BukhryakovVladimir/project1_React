export {}; // change that later to export the validation script
// sign up validation
// const form_sign_up = document.getElementById("sign_up_form");
// const email_sign_up = document.getElementById("email_sign_up");
// const username_sign_up = document.getElementById("username_sign_up");
// const password_sign_up = document.getElementById("password_sign_up");

// form_sign_up.addEventListener("submit", (e) => {
//   if (!email_valid && !username_valid && !password_valid) e.preventDefault();

//   checkInputs();

//   if (email_valid && username_valid && password_valid)
//     HTMLFormElement.prototype.submit.call(form_sign_up);
// });

// function checkInputs() {
//   const usernameValue = (username_sign_up as HTMLInputElement).value.trim();
//   const emailValue = (email_sign_up as HTMLInputElement).value.trim();
//   const passwordValue = (password_sign_up as HTMLInputElement).value.trim();

//   if (emailValue.length <= 255) {
//     if (emailValue === "") {
//       setErrorFor(email_sign_up, "Email can't be empty");
//       email_valid = false;
//     } else if (!isEmail(emailValue)) {
//       setErrorFor(email_sign_up, "Email is invalid");
//       email_valid = false;
//     } else {
//       setSuccessFor(email_sign_up);
//       email_valid = true;
//     }
//   } else {
//     setErrorFor(email_sign_up, "Email is too long");
//     email_valid = false;
//   }

//   if (usernameValue.length >= 3 && usernameValue.length <= 30) {
//     if (/^[A-Za-z0-9_]*$/.test(usernameValue)) {
//       setSuccessFor(username_sign_up);
//       username_valid = true;
//     } else {
//       setErrorFor(username_sign_up, "Only letters, numbers and _ are allowed");
//       username_valid = false;
//     }
//   } else {
//     setErrorFor(
//       username_sign_up,
//       "Username must be between 3 and 30 characters"
//     );
//     username_valid = false;
//   }

//   if (passwordValue.length >= 8) {
//     if (/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]*$/.test(passwordValue)) {
//       setSuccessFor(password_sign_up);
//       password_valid = true;
//     } else {
//       setErrorFor(
//         password_sign_up,
//         "Password must contain letters and numbers(special characters !@#$%^&* are allowed)"
//       );
//       password_valid = false;
//     }
//   } else {
//     setErrorFor(password_sign_up, "Password must be at least 8 characters");
//     password_valid = false;
//   }
// }

//login validation
const form_login = document.getElementById("login_form");
const email_login = document.getElementById("email");
const password_login = document.getElementById("password");

var email_valid = false;
var username_valid = false;
var password_valid = false;

var email_valid_login = false;
var password_valid_login = false;

form_login.addEventListener("submit", (e) => {
  if (!email_valid_login && !password_valid_login) e.preventDefault();

  checkInputs_login();

  if (email_valid_login && password_valid_login)
    HTMLFormElement.prototype.submit.call(form_login);
});

function checkInputs_login() {}

function setErrorFor(input: any, message: any) {
  const inputControl = input.parentElement;

  inputControl.querySelector("small").innerText = message;

  inputControl.className = "input-control error";
}

function setSuccessFor(input: any) {
  const inputControl = input.parentElement;

  inputControl.querySelector("small").innerText = "";

  inputControl.className = "input-control success";
}

function isEmail(email: any) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
