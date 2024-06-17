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
            document
               .querySelector(".home-hero__slider")
               .addEventListener("mouseenter", () => {
                  if (!isStop) {
                     this.autoplay.pause();
                     stopBtn.classList.add("active");
                  }
               });
            document
               .querySelector(".home-hero__slider")
               .addEventListener("mouseleave", () => {
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
      new Swiper(`#product${index + 1} .swiper`, {
         speed: 400,
         spaceBetween: 12,
         slidesPerView: 1,
         loop: true,
         pagination: {
            el: `#product${index + 1} .swiper .product-card__pagination`,
            clickable: true,
         },
      });
   });
   document
      .querySelectorAll(".product-section__slider")
      .forEach((slider, index) => {
         new Swiper(`#productSlider${index + 1} .product-section__slider`, {
            speed: 400,
            spaceBetween: 4,
            slidesPerView: "auto",
            slidesPerGroup: "auto",
            navigation: {
               nextEl: `#productSlider${index + 1} .product-section__nav_next`,
               prevEl: `#productSlider${index + 1} .product-section__nav_prev`,
            },
            breakpoints: {
               1441: {
                  slidesPerView: 5,
                  spaceBetween: 12,
                  slidesPerGroup: 5,
               },
               1025: {
                  spaceBetween: 12,
                  slidesPerView: "auto",
                  slidesPerGroup: "auto",
               },
               568: {
                  spaceBetween: 16,
                  slidesPerView: "auto",
                  slidesPerGroup: "auto",
               },
            },
         });
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
      pagination: {
         el: ".news-thumbs__pagination",
         dynamicBullets: true,
         clickable: true,
      },
      initialSlide: 2,
      breakpoints: {
         993: {
            speed: 500,
            effect: "fade",
         },
      },
   });
   const newsSwiper = new Swiper(".news-section__gallery .swiper", {
      speed: 500,
      spaceBetween: 10,
      slidesPerView: "auto",
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
         depth: 1,
         modifier: 1,
         slideShadows: false,
      },
      initialSlide: 2,
   });
}
