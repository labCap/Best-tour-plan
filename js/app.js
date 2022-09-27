(() => {
    "use strict";
    let addWindowScrollEvent = false;
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                if (headerShow) {
                    if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    timer = setTimeout((() => {
                        !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    }), headerShowTimer);
                }
            } else {
                header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function DynamicAdapt(type) {
        this.type = type;
    }
    DynamicAdapt.prototype.init = function() {
        const _this = this;
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        this.nodes = document.querySelectorAll("[data-da]");
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
        this.arraySort(this.оbjects);
        this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
            return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }), this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        }));
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ",");
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                return item.breakpoint === mediaBreakpoint;
            }));
            matchMedia.addListener((function() {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            }));
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };
    DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
        if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        } else for (let i = оbjects.length - 1; i >= 0; i--) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
    };
    DynamicAdapt.prototype.moveTo = function(place, element, destination) {
        element.classList.add(this.daClassname);
        if ("last" === place || place >= destination.children.length) {
            destination.insertAdjacentElement("beforeend", element);
            return;
        }
        if ("first" === place) {
            destination.insertAdjacentElement("afterbegin", element);
            return;
        }
        destination.children[place].insertAdjacentElement("beforebegin", element);
    };
    DynamicAdapt.prototype.moveBack = function(parent, element, index) {
        element.classList.remove(this.daClassname);
        if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
    };
    DynamicAdapt.prototype.indexInParent = function(parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    DynamicAdapt.prototype.arraySort = function(arr) {
        if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) return 0;
                if ("first" === a.place || "last" === b.place) return -1;
                if ("last" === a.place || "first" === b.place) return 1;
                return a.place - b.place;
            }
            return a.breakpoint - b.breakpoint;
        })); else {
            Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return 1;
                    if ("last" === a.place || "first" === b.place) return -1;
                    return b.place - a.place;
                }
                return b.breakpoint - a.breakpoint;
            }));
            return;
        }
    };
    const da = new DynamicAdapt("max");
    da.init();
    const burger = document.querySelector(".icon-menu");
    const burgerMenu = document.querySelector(".header-bottom");
    const btnOpenDropDown = document.querySelector(".user__arrow-down");
    const dropDownMenu = document.querySelector(".header-medium__drop-down");
    burger.addEventListener("click", (() => {
        burger.classList.toggle("menu-open");
        burgerMenu.classList.toggle("menu-open");
        document.body.classList.toggle("_lock");
    }));
    btnOpenDropDown.addEventListener("click", (() => {
        btnOpenDropDown.classList.toggle("open");
        dropDownMenu.classList.toggle("open");
    }));
    const tabTitle = document.querySelectorAll(".tabs__title");
    const tab = document.querySelectorAll(".tabs__body");
    tabTitle.forEach((i => {
        i.addEventListener("click", (() => {
            let thisTabTitle = i;
            let tabId = thisTabTitle.getAttribute("data-tab");
            let thisTab = document.querySelector(tabId);
            tabTitle.forEach((j => {
                j.classList.remove("active");
            }));
            tab.forEach((j => {
                j.classList.remove("active");
            }));
            thisTabTitle.classList.add("active");
            thisTab.classList.add("active");
        }));
    }));
    $(document).ready((function() {
        $(".spoiler-title").click((function(event) {
            if ($(".footer-top").hasClass("one")) {
                $(".spoiler-title").not($(this)).removeClass("active");
                $(".spoiler-list").not($(this).next()).slideUp(300);
            }
            $(this).toggleClass("active").next().slideToggle(300);
        }));
        $(".intro-slider").slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: ".intro__slider-prev",
            nextArrow: ".intro__slider-next"
        });
        $(".about__slider").slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: ".about__slider-prev",
            nextArrow: ".about__slider-next",
            responsive: [ {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            } ]
        });
        $(".blog__slider").slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            prevArrow: ".blog__slider-prev",
            nextArrow: ".blog__slider-next",
            responsive: [ {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            } ]
        });
        let userPhone = $("#footer-form-phone");
        userPhone.mask("+(999) 999-9999");
        $(".footer__form").submit((function(e) {
            e.preventDefault();
            let userName = $("#footer-form-name"), userPhone = $("#footer-form-phone"), userMessage = $("#footer-form-mess");
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
        }));
        $(".newsletter__form").submit((function(e) {
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
        }));
    }));
    window["FLS"] = true;
    headerScroll();
})();