// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей

// import Swiper from "swiper";

const burger = document.querySelector(".icon-menu");
const burgerMenu = document.querySelector(".header-bottom");
const btnOpenDropDown = document.querySelector(".user__arrow-down");
const dropDownMenu = document.querySelector(".header-medium__drop-down");

burger.addEventListener("click", () => {
  burger.classList.toggle("menu-open");
  burgerMenu.classList.toggle("menu-open");
  document.body.classList.toggle("_lock");
});
btnOpenDropDown.addEventListener("click", () => {
  btnOpenDropDown.classList.toggle("open");
  dropDownMenu.classList.toggle("open");
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

  let userPhone = $("#footer-form-phone");

  userPhone.mask("+(999) 999-9999");

  $(".footer__form").submit(function (e) {
    e.preventDefault();
    let userName = $("#footer-form-name"),
      userPhone = $("#footer-form-phone"),
      userMessage = $("#footer-form-mess");

    if (userName.val().length < 2) {
      userName.removeClass("success");
      userName.addClass("invalid");
      return false;
    } else {
      userName.removeClass("invalid");
      userName.addClass("success");
    }

    if (userPhone.val().length < 7) {
      userPhone.removeClass("success");
      userPhone.addClass("invalid");
      return false;
    } else {
      userPhone.removeClass("invalid");
      userPhone.addClass("success");
    }
    if (userMessage.val().length < 1) {
      userMessage.removeClass("success");
      userMessage.addClass("invalid");
      return false;
    } else {
      userMessage.removeClass("invalid");
      userMessage.addClass("success");
    }
  });

  $(".newsletter__form").submit(function (e) {
    e.preventDefault();
    let userEmail = $("#newsletter-form-email");

    if (userEmail.val().length < 7) {
      userEmail.removeClass("success");
      userEmail.addClass("invalid");
      return false;
    } else {
      userEmail.removeClass("invalid");
      userEmail.addClass("success");
    }

    // $("#thanks-contact h3").text(`Thank you, ${userName.val()}`);
    // $("#thanks-contact .content").text(`Your message: ${userMessage.val()}`);

    // $("#contact-btn").attr("data-popup", "#thanks-contact");

    // $("#contact-btn").click();
  });
});
