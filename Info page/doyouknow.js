var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    centerSlide: 'true',
    fade:'true',
    grabCursor: 'true',
    loop: False,
    loopFillGroupWithBlank: False,
    spaceBetween: 25,
    hashNavigation: {
      watchState: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });