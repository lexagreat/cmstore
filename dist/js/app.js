(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector("html").classList.add("webp");
      } else {
         document.querySelector("html").classList.add("no-webp");
      }
   });
})();

document.addEventListener("DOMContentLoaded", () => {
   // home
   initHeroSwiper();
   enableScrollForCategories();
   initSalesSwiper();
   initProductsSwiper();
   initNewsSwiper();

   //faq
   useNavigation();
   accordion(".faq-item__header", ".faq-item__collapse");

   //contacts
   checkInputValue();
   inputMasks();
   comparePage();
});

function initHeroSwiper() {
   if (!document.querySelector(".home-hero__slider")) {
      return;
   }
   let isStop = false;
   const paginationElem = document.querySelector(".home-hero__pagination");
   const stopBtn = document.querySelector(".home-hero__stop");
   const heroSwiper = new Swiper(".home-hero__slider", {
      speed: 400,
      spaceBetween: 100,
      effect: "fade",
      navigation: {
         nextEl: ".home-hero__nav_next",
         prevEl: ".home-hero__nav_prev",
      },
      loop: true,
      autoplay: {
         delay: 5000,
      },
      pagination: {
         el: ".home-hero__pagination",
         clickable: true,
      },
      on: {
         autoplayTimeLeft(s, time, progress) {
            paginationElem.style.setProperty(
               "--progress",
               (1 - progress) * 100
            );
         },
         slideChange(swiper) {
            stopBtn.classList.remove("active");
         },
         init() {
            stopBtn.addEventListener("click", () => {
               if (this.autoplay.paused) {
                  this.autoplay.resume();
                  isStop = false;

                  stopBtn.classList.remove("active");
               } else {
                  this.autoplay.pause();
                  isStop = true;
                  stopBtn.classList.add("active");
               }
            });
            // document
            //    .querySelector(".home-hero__slider")
            //    .addEventListener("mouseenter", (e) => {
            //       // if (e.target.closest(".home-hero__inner")) {
            //       //    console.log(e);
            //       // }
            //       if (!isStop) {
            //          this.autoplay.pause();
            //          stopBtn.classList.add("active");
            //       }
            //    });
            document
               .querySelector(".home-hero__slider")
               .addEventListener("mousemove", (e) => {
                  if (
                     e.target.getBoundingClientRect().height - e.offsetY <
                     80
                  ) {
                     if (this.autoplay.paused && !isStop) {
                        this.autoplay.resume();
                        stopBtn.classList.remove("active");
                     }
                  } else {
                     if (!isStop && !this.autoplay.paused) {
                        this.autoplay.pause();
                        stopBtn.classList.add("active");
                     }
                  }
               });
            document
               .querySelector(".home-hero__slider")
               .addEventListener("mouseleave", (e) => {
                  if (!isStop && this.autoplay.paused) {
                     this.autoplay.resume();
                     stopBtn.classList.remove("active");
                  }
               });
         },
      },
   });
}
function enableScrollForCategories() {
   const slider = document.querySelector(".category-section__inner");
   if (!slider) {
      return;
   }
   const prevBtn = document.querySelector(".category-section__nav_prev");
   const nextBtn = document.querySelector(".category-section__nav_next");
   prevBtn.addEventListener("click", () => {
      slider.scrollLeft = 0;
   });
   nextBtn.addEventListener("click", () => {
      slider.scrollLeft = slider.scrollWidth;
   });
}
function initSalesSwiper() {
   if (!document.querySelector(".sales-section__swiper")) {
      return;
   }
   const salesSwiper = new Swiper(".sales-section__swiper", {
      speed: 400,
      spaceBetween: 10,
      slidesPerView: "auto",
      mousewheel: {
         enabled: true,
         forceToAxis: true,
      },
      navigation: {
         nextEl: ".sales-section__nav_next",
         prevEl: ".sales-section__nav_prev",
      },
      // loop: true,
      breakpoints: {
         1441: {
            slidesPerView: 4,
         },
      },
   });
}
function initProductsSwiper() {
   if (document.querySelectorAll(".product-card").length) {
      document.querySelectorAll(".product-card").forEach((product, index) => {
         let productSwiper = new Swiper(`#product${index + 1} .swiper`, {
            speed: 400,
            spaceBetween: 12,
            slidesPerView: 1,
            loop: true,
            allowTouchMove: false,
            pagination: {
               el: `#product${index + 1} .swiper .product-card__pagination`,
               clickable: true,
            },
         });
         let elems = product.querySelectorAll(".product-card__hidden li");
         elems.forEach((elem, index) => {
            elem.addEventListener("mouseover", () => {
               productSwiper.slideTo(index);
            });
         });
      });
   }
   if (document.querySelectorAll(".product-section__slider").length) {
      document
         .querySelectorAll(".product-section__slider")
         .forEach((slider, index) => {
            let productSwiper = new Swiper(
               `#productSlider${index + 1} .product-section__slider`,
               {
                  speed: 400,
                  spaceBetween: 4,
                  slidesPerView: "auto",
                  freeMode: true,
                  // slidesPerGroup: "auto",
                  mousewheel: {
                     enabled: true,
                     forceToAxis: true,
                  },
                  navigation: {
                     nextEl: `#productSlider${
                        index + 1
                     } .product-section__nav_next`,
                     prevEl: `#productSlider${
                        index + 1
                     } .product-section__nav_prev`,
                  },
                  breakpoints: {
                     1550: {
                        slidesPerView: 5,
                        spaceBetween: 12,
                        // slidesPerGroup: 5,
                     },
                     1025: {
                        spaceBetween: 12,
                        slidesPerView: "auto",
                        // slidesPerGroup: "auto",
                     },
                     568: {
                        spaceBetween: 16,
                        slidesPerView: "auto",
                        // slidesPerGroup: "auto",
                     },
                  },
                  on: {
                     init() {
                        document
                           .querySelector(
                              `#productSlider${
                                 index + 1
                              } .product-section__nav_next`
                           )
                           .addEventListener("click", () => {
                              productSwiper.slideTo(
                                 productSwiper.activeIndex + 4
                              );
                           });
                        document
                           .querySelector(
                              `#productSlider${
                                 index + 1
                              } .product-section__nav_prev`
                           )
                           .addEventListener("click", () => {
                              productSwiper.slideTo(
                                 productSwiper.activeIndex - 4
                              );
                           });
                     },
                  },
               }
            );
         });
   }
}
function initNewsSwiper() {
   if (!document.querySelector(".news-section__gallery .swiper")) {
      return;
   }

   const newsThumbs = new Swiper(".news-section__thumbs", {
      speed: 1000,
      watchSlidesProgress: true,
      slidesPerView: 1,
      spaceBetween: 8,
      // mousewheel: true,

      pagination: {
         el: ".news-thumbs__pagination",
         dynamicBullets: true,
         clickable: true,
      },
      initialSlide: 2,
      breakpoints: {
         993: {
            speed: 500,
            // effect: "fade",
         },
      },
   });
   const newsSwiper = new Swiper(".news-section__gallery .swiper", {
      speed: 800,
      spaceBetween: 10,
      slidesPerView: "auto",
      // mousewheel: {
      //    enabled: true,
      //    forceToAxis: true,
      // },

      navigation: {
         nextEl: ".news-section__nav_next",
         prevEl: ".news-section__nav_prev",
      },
      direction: "vertical",
      centeredSlides: true,
      thumbs: {
         swiper: newsThumbs,
      },
      pagination: {
         el: ".news-section__controllers .swiper-pagination",
         dynamicBullets: true,
         clickable: true,
      },
      effect: "coverflow",
      coverflowEffect: {
         slideScaleEffect: 1,
         rotate: 1,
         stretch: 100,
         // depth: 1,
         // modifier: 1,
         slideShadows: false,
      },
      initialSlide: 2,
      on: {
         init(swiper) {
            const slides = document.querySelectorAll(
               ".news-section__gallery .swiper .swiper-slide"
            );
            slides.forEach((slide, index) => {
               slide.addEventListener("click", () => {
                  newsSwiper.slideTo(index);
               });
            });
         },
      },
   });
}
function useNavigation() {
   let headerHeight = document
      .querySelector(".header")
      ?.getBoundingClientRect().height;
   let navbar = document.querySelector(".faq-navigation");
   if (!navbar) {
      return;
   }
   let navbarHeight = navbar?.getBoundingClientRect().height;
   let sticky = navbar.offsetTop;
   window.addEventListener("scroll", makeNavSticky);
   makeNavSticky();
   pageNavigation();

   // onBeforeUnmount(() => {
   //    window.removeEventListener("scroll", makeNavSticky);
   // });
   function makeNavSticky() {
      if (window.scrollY + headerHeight >= sticky) {
         navbar.classList.add("sticky");
         navbar.classList.add("lock-padding");
      } else {
         navbar.classList.remove("sticky");
         navbar.classList.remove("lock-padding");
      }
   }

   function pageNavigation() {
      const navSwiper = new Swiper(".faq-navigation .swiper", {
         speed: 500,
         spaceBetween: 8,
         slidesPerView: "auto",
         mousewheel: {
            enabled: true,
            forceToAxis: true,
         },
         freeMode: true,
      });
      const links = document.querySelectorAll(".faq-navigation__link");
      const sections = document.querySelectorAll(".faq-section");
      if (!links.length) {
         return;
      }
      links.forEach((link, index) => {
         link.addEventListener("click", () => {
            sections.forEach((section, i) => {
               if (index === i) {
                  window.scrollBy({
                     top:
                        section.getBoundingClientRect().top -
                        headerHeight -
                        navbarHeight -
                        24,
                     behavior: "smooth",
                  });
               }
            });
         });
      });

      const callback = (entries, observer) => {
         entries.forEach((entry) => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
               let section = entry.target?.nextElementSibling;
               if (!section || !section.getAttribute("data-scroll")) {
                  return;
               }
               let id = section.getAttribute("data-scroll");
               links.forEach((link) => {
                  link.classList.remove("active");
                  if (link.getAttribute("data-scroll") === id) {
                     link.classList.add("active");
                     // navSwiper.scrollTo(id)
                     navSwiper.slideTo(id);
                  }
               });
            } else {
               if (entry.boundingClientRect.top < 0) {
                  let section = entry.target;
                  if (!section || !section.getAttribute("data-scroll")) {
                     return;
                  }
                  let id = section.getAttribute("data-scroll");
                  links.forEach((link) => {
                     link.classList.remove("active");
                     if (link.getAttribute("data-scroll") === id) {
                        link.classList.add("active");
                        navSwiper.slideTo(id);
                     }
                  });
               }
            }
         });
      };

      const options = {
         // root: по умолчанию window, но можно задать любой элемент-контейнер
         rootMargin: "-150px 0px 0px 0px",
         threshold: 0,
      };

      const observer = new IntersectionObserver(callback, options);

      sections.forEach((section) => observer.observe(section));
   }
}
function checkInputValue() {
   const inputs = document.querySelectorAll(".app-input");

   if (!inputs.length) return;
   inputs.forEach((item) => {
      let input =
         item.querySelector('input[type="text"]') ||
         item.querySelector("textarea");
      input.addEventListener("input", (e) => {
         let value = e.target.value;
         if (value) {
            item.classList.add("filled");
         } else {
            item.classList.remove("filled");
         }
      });
      input.addEventListener("focus", (e) => {
         item.classList.add("filled");
      });
      input.addEventListener("blur", (e) => {
         let value = e.target.value;
         if (!value) {
            item.classList.remove("filled");
         }
      });
   });
}
function inputMasks() {
   const maskOptions = {
      mask: "+{7} (000) 000-00-00",
      // lazy: false,  // make placeholder always visible
      // placeholderChar: '0'     // defaults to '_'
   };
   if (document.getElementById("phone")) {
      const mask = IMask(document.getElementById("phone"), maskOptions);
   }
}

function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            // for (let j = 0; j < contents.length; j++) {
            //    // если хоть один открывается - return
            //    if (contents[j].classList.contains("collapsing")) {
            //       return;
            //    } // Иначе
            //    // все прячем
            //    slideHide(contents[j], 500);
            // }
            // for (let j = 0; j < openLinks.length; j++) {
            //    openLinks[j].classList.remove("active");
            // }
            // записываем в переменную нужный таб
            let content = openLink.nextElementSibling;
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return;
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active");
               slideHide(content, 500);
            } else {
               openLink.classList.add("active");
            }
            // показываем нужный
            slideShow(content, 500);
         });
      }
   }
}

function slideShow(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideHide(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}

// Popup
const popupLinks = document.querySelectorAll(".modal__link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");
const popupCloseIcon = document.querySelectorAll(".modal__close");

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute("href").replace("#", "");
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}

if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
         popupClose(el.closest(".modal"));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector(".modal.open");
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add("open");
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest(".modal__content")) {
            popupClose(e.target.closest(".modal"));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add("lock");

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener("keydown", function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector(".modal.open");
      popupClose(popupActive);
   }
});

function comparePage() {
   accordion(".compare-stat__header", ".compare-stat__main");
   desktop();
   tablet();
   mobile();
   function mobile() {
      let mobileArr = [];
      let mainArr = [];
      document
         .querySelectorAll(".compare-products .mobile .swiper")
         .forEach((item, i) => {
            let swiper = new Swiper(`#mobileSwiper${i}`, {
               slidesPerView: 1,
               spaceBetween: 12,
               pagination: {
                  el: `#mobileSwiper${i} .swiper-pagination`,
                  clickable: true,
                  renderCustom: function (swiper, current, total) {
                     return current + " of " + total;
                  },
               },
               on: {
                  slideChange(swiper) {
                     let temp = mobileArr.filter(
                        (item, index) => !((index - i) % 2)
                     );
                     temp.forEach((item) => {
                        item.slideTo(swiper.activeIndex);
                     });
                     if (swiper.el.querySelector(".pagination .current")) {
                        swiper.el.querySelector(
                           ".pagination .current"
                        ).innerHTML = swiper.activeIndex + 1;
                     }
                  },
               },
            });
         });
      const stats = document.querySelectorAll(".compare-stat");
      stats.forEach((item, index) => {
         const mobile = item.querySelector(".mobile");
         mobile.querySelectorAll(".swiper").forEach((child, i) => {
            let swiper = new Swiper(`#mobileInfo${i + index * 2}`, {
               slidesPerView: 1,
               spaceBetween: 12,
            });
            mobileArr.push(swiper);
         });
      });
   }
   function tablet() {
      let tabletArray = [];
      let tabletMainArray = [];
      document
         .querySelectorAll(".compare-products .tablet .swiper")
         .forEach((item, i) => {
            let swiper = new Swiper(`#tabletSwiper${i}`, {
               slidesPerView: 1,
               spaceBetween: 12,
               pagination: {
                  el: `#tabletSwiper${i} .swiper-pagination`,
                  clickable: true,
                  // renderCustom: function (swiper, current, total) {
                  //    return `
                  //       <span class="current caption">0${current} –</span>
                  //       <span class="total caption">0${total}</span>
                  //    `;
                  // },
               },
               on: {
                  slideChange(swiper) {
                     let temp = tabletArray.filter(
                        (item, index) => !((index - i) % 3)
                     );
                     temp.forEach((item) => {
                        item.slideTo(swiper.activeIndex);
                     });
                     i > 2
                        ? tabletMainArray[i - 3].slideTo(swiper.activeIndex)
                        : tabletMainArray[i + 3].slideTo(swiper.activeIndex);
                     if (swiper.el.querySelector(".pagination .current")) {
                        swiper.el.querySelector(
                           ".pagination .current"
                        ).innerHTML = swiper.activeIndex + 1;
                     }
                     // document.querySelector(
                     //    `#tabletSwiper${i} .pagination .current`
                     // ).innerHTML = swiper.activeIndex;
                  },
               },
            });
            tabletMainArray.push(swiper);
         });
      const stats = document.querySelectorAll(".compare-stat");
      stats.forEach((item, index) => {
         const tablet = item.querySelector(".tablet");
         tablet.querySelectorAll(".swiper").forEach((child, i) => {
            let swiper = new Swiper(`#tabletInfo${i + index * 3}`, {
               slidesPerView: 1,
               spaceBetween: 12,
            });
            tabletArray.push(swiper);
         });
      });
      // const stickyTabletsSwipers = document.querySelectorAll('.compare-products .tablet .sticky-swiper')
   }
   function desktop() {
      let desktopArray = [];
      const stats = document.querySelectorAll(".compare-stat");
      stats.forEach((item, index) => {
         let swiper = new Swiper(`#stat${index} .desktop .swiper`, {
            slidesPerView: 3,
            spaceBetween: 8,
            breakpoints: {
               1400: {
                  slidesPerView: 4,
                  spaceBetween: 6,
               },
               993: {
                  spaceBetween: 12,
               },
               659: {
                  spaceBetween: 20,
               },
            },
         });
         desktopArray.push(swiper);
      });
      const desktopSwiper = new Swiper(".desktop .compare-products__swiper", {
         slidesPerView: 3,
         spaceBetween: 8,
         navigation: {
            prevEl: ".compare-products__nav_prev",
            nextEl: ".compare-products__nav_next",
         },
         breakpoints: {
            1400: {
               slidesPerView: 4,
               spaceBetween: 6,
            },
            993: {
               spaceBetween: 12,
            },
            659: {
               spaceBetween: 20,
            },
         },
         on: {
            slideChange(swiper) {
               let index = swiper.activeIndex;
               desktopArray.forEach((item) => {
                  item.slideTo(index);
               });
               desktopStickySwiper.slideTo(index);
            },
         },
      });

      const desktopStickySwiper = new Swiper(".desktop .sticky-swiper", {
         slidesPerView: 3,
         spaceBetween: 12,
         breakpoints: {
            1400: {
               slidesPerView: 4,
               spaceBetween: 12,
            },
            993: {
               spaceBetween: 12,
            },
            659: {
               spaceBetween: 20,
            },
         },
         on: {
            slideChange(swiper) {
               let index = swiper.activeIndex;
               desktopArray.forEach((item) => {
                  item.slideTo(index);
               });
               desktopSwiper.slideTo(index);
            },
         },
      });
   }
   let headerHeight = document
      .querySelector(".header")
      ?.getBoundingClientRect().height;
   let navbar = document.querySelector(".compare-products");
   if (!navbar) {
      return;
   }
   let navbarHeight = navbar?.offsetHeight;

   let sticky = navbar.offsetTop;
   function makeNavSticky() {
      if (window.scrollY + headerHeight >= sticky + 400) {
         navbar.classList.add("sticky");
         navbar.classList.add("lock-padding");
      } else {
         navbar.classList.remove("sticky");
         navbar.classList.remove("lock-padding");
      }
   }
   window.addEventListener("scroll", makeNavSticky);
   makeNavSticky();
}
