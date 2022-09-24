// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей

const burger = document.querySelector(".icon-menu");
const burgerMenu = document.querySelector(".header-bottom");

burger.addEventListener("click", () => {
  burger.classList.toggle("menu-open");
  burgerMenu.classList.toggle("menu-open");
  document.body.classList.toggle("_lock");
});
