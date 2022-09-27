// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей

// import Swiper from "swiper";

const burger = document.querySelector(".icon-menu");
const burgerMenu = document.querySelector(".header-bottom");

burger.addEventListener("click", () => {
  burger.classList.toggle("menu-open");
  burgerMenu.classList.toggle("menu-open");
  document.body.classList.toggle("_lock");
});

const tabTitle = document.querySelectorAll(".tabs__title");
const tab = document.querySelectorAll(".tabs__body");

tabTitle.forEach((i) => {
  i.addEventListener("click", () => {
    let thisTabTitle = i;
    let tabId = thisTabTitle.getAttribute("data-tab");
    let thisTab = document.querySelector(tabId);

    tabTitle.forEach((j) => {
      j.classList.remove("active");
    });

    tab.forEach((j) => {
      j.classList.remove("active");
    });

    thisTabTitle.classList.add("active");
    thisTab.classList.add("active");
  });
});

$(document).ready(function () {
  $(".spoiler-title").click(function (event) {
    if ($(".footer-top").hasClass("one")) {
      $(".spoiler-title").not($(this)).removeClass("active");
      $(".spoiler-list").not($(this).next()).slideUp(300);
    }

    $(this).toggleClass("active").next().slideToggle(300);
  });

  $(".intro-slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: ".intro__slider-prev",
    nextArrow: ".intro__slider-next",
  });

  $(".about__slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: ".about__slider-prev",
    nextArrow: ".about__slider-next",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });

  $(".blog__slider").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    prevArrow: ".blog__slider-prev",
    nextArrow: ".blog__slider-next",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  let userPhone = $("#user-phone");

  userPhone.mask("(999) 999-9999");

  $(".footer__form").submit(function (e) {
    e.preventDefault();
    let userName = $("#user-name"),
      userEmail = $("#user-email"),
      userPhone = $("#user-phone"),
      userMessage = $("#user-message");

    console.log(userMessage.val().length);

    if (userName.val().length < 2) {
      userName.addClass("invalid");
      return false;
    } else userName.removeClass("invalid");

    if (userEmail.val().length < 7) {
      userEmail.addClass("invalid");
      return false;
    } else userEmail.removeClass("invalid");
    if (userPhone.val().length < 7) {
      userPhone.addClass("invalid");
      return false;
    } else userPhone.removeClass("invalid");
    if (userMessage.val().length < 7) {
      userMessage.addClass("invalid");
      return false;
    } else userMessage.removeClass("invalid");

    $("#thanks-contact h3").text(`Thank you, ${userName.val()}`);
    $("#thanks-contact .content").text(`Your message: ${userMessage.val()}`);

    $("#contact-btn").attr("data-popup", "#thanks-contact");

    $("#contact-btn").click();
  });
});
