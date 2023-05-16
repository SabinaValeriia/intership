let selectContainer = document.querySelector(".select-container");
let select = document.querySelector(".select");
let input = document.getElementById("role");
let options = document.querySelectorAll(".select-container .option");

select.onclick = () => {
  selectContainer.classList.toggle("active");
};

options.forEach((e) => {
  e.addEventListener("click", () => {
    input.value = e.innerText;
    selectContainer.classList.remove("active");
    options.forEach((e) => {
      e.classList.remove("selected");
    });
    e.classList.add("selected");
  });
});
const Roles = {
  ADMIN: "Admin",
  USER: "User",
};

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("email").classList.remove("error");
  document.getElementById("emailError").textContent = "";
  document.getElementById("name").classList.remove("error");
  document.getElementById("nameError").textContent = "";
  document.getElementById("password").classList.remove("error");
  document.getElementById("passwordError").textContent = "";
  document.getElementById("role").classList.remove("error");
  

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let isValid = true;

  if (email === "") {
    isValid = false;
    document.getElementById("email").classList.add("error");
    document.getElementById("emailError").textContent =
      "This field is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    isValid = false;
    document.getElementById("email").classList.add("error");
    document.getElementById("emailError").textContent =
      "Please enter a valid email address.";
  }

  if (password === "") {
    isValid = false;
    document.getElementById("password").classList.add("error");
    document.getElementById("passwordError").textContent =
      "This field is required.";
  } else if (
    password.length < 8 ||
    !/\d/.test(password) ||
    !/[A-Z]/.test(password)
  ) {
    isValid = false;
    document.getElementById("password").classList.add("error");
    document.getElementById("passwordError").textContent =
      "Password must be at least 8 characters long and contain at least one uppercase letter and one digit.";
  }

  if (name === "") {
    isValid = false;
    document.getElementById("name").classList.add("error");
    document.getElementById("nameError").textContent =
      "This field is required.";
  } else if (!/^[A-Za-z]+$/.test(name)) {
    isValid = false;
    document.getElementById("name").classList.add("error");
    document.getElementById("nameError").textContent =
      "Name should only contain letters.";
  }
  let yourselect = document.getElementById("selectButton").innerHTML;
  if (yourselect === "" || yourselect === "Select") {

    isValid = false;
    document.getElementById("role").classList.add("error");
  } else {
    document.getElementById("role").classList.remove("error");
  }
  if (isValid) {
    console.log("Form submitted successfully");
  }
});

Select(document.querySelector(".beatu-select"), Roles);

function Select(yourselect, roles) {
  yourselect.style.display = "none";
  let newdiw = document.createElement("div");
  let parentDiv = yourselect.parentNode;
  parentDiv.insertBefore(newdiw, yourselect);
  newdiw.classList.add("select");
  newdiw.id = "role";
  newdiw.innerHTML = `<div id="selectButton" class="button">Select</div><div class="selectlist"> </div>`;
  let list = newdiw.querySelector(".selectlist");
  list.style.display = "none";
  yourselect.querySelectorAll("option").forEach((element) => {
    list.innerHTML +=
      '<div data-id="' + element.index + '">' + element.text + "</div>";
  });
  newdiw.querySelector(".button").onclick = function () {
    if (list.style.display == "none") list.style.display = "block";
    else list.style.display = "none";
  };
  newdiw.querySelectorAll(".selectlist > div").forEach((element) => {
    element.onclick = function () {
      newdiw.querySelectorAll(".selectlist > div").forEach((element) => {
        element.classList.remove("active");
      });
      newdiw.querySelector(".button").innerText = this.innerText;
      this.classList.add("active");
      list.style.display = "none";
      yourselect.options[this.dataset.id].selected = true;
    };
  });
}

function onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
function signOut() {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  console.log('User signed out.');
  });
}