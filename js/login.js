import Alertt from "./alert.js";

let email = document.querySelector("[type='email']");
let password = document.querySelector("[type='password']");
let login = document.querySelector("[type='submit']");

let validateMsg = (input, message) => {
  let msg = document.createElement("p");
  msg.style.cssText = `
    color:red;
    font-size:11px;
    margin:2px auto;
    margin-bottom:-2px;
    `;
  msg.className = "msg";

  let query = document.querySelector(".msg");
  if (query == null) {
    switch (input) {
      case "email":
        msg.textContent = message;
        email.after(msg);
        break;

      case "password":
        msg.textContent = message;
        password.after(msg);
        break;
      default:
        msg.textContent = message;
        email.after(msg);
        password.after(msg);
    }
  }
};

login.addEventListener("click", (e) => {
  e.preventDefault();
  let validation = true;
  if (email.value == "") {
    validateMsg("email", "Please enter your email");
    validation = false;
  } else if (email.value.length < 6) {
    validateMsg("email", "Please enter a valid email");
    validation = false;
  }
  if (password.value == "") {
    validateMsg("password", "Please enter your password");
    validation = false;
  } else if (password.value.length < 5) {
    validateMsg("password", "password must be at least 5 characters long");
    validation = false;
  }
  if (validation) {
    window.location.href += "/html/items.html";
  }
});
