// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей

const burger = document.querySelector(".icon-menu");
const burgerMenu = document.querySelector(".header-bottom");

burger.addEventListener("click", () => {
  burger.classList.toggle("menu-open");
  burgerMenu.classList.toggle("menu-open");
  document.body.classList.toggle("_lock");
});

$(document).ready(function () {
  $(".spoiler-title").click(function (event) {
    if ($(".footer-top").hasClass("one")) {
      $(".spoiler-title").not($(this)).removeClass("active");
      $(".spoiler-list").not($(this).next()).slideUp(300);
    }

    $(this).toggleClass("active").next().slideToggle(300);
  });
});
