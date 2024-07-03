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
   if (!document.querySelector(".product-section__slider")) {
      return;
   }
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
            console.log(index);
            productSwiper.slideTo(index);
         });
      });
   });
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
                           productSwiper.slideTo(productSwiper.activeIndex + 4);
                        });
                     document
                        .querySelector(
                           `#productSlider${
                              index + 1
                           } .product-section__nav_prev`
                        )
                        .addEventListener("click", () => {
                           productSwiper.slideTo(productSwiper.activeIndex - 4);
                        });
                  },
               },
            }
         );
      });
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
