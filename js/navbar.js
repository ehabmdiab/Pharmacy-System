let burger = document.getElementById("burger");
let ul = document.querySelector(".ul");

burger.addEventListener("click", () => {
  ul.classList.toggle("show");
  ul.style.display = "flex";
  if (!ul.classList.contains("show")) {
    ul.style.display = "none";
  }
});
