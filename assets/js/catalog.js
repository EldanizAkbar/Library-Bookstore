$(document).ready(function () {
  $(".responsive").slick({
    dots: true,
    infinite: true,
    arrows: true,
    prevArrow:
      "<span  class='priv_arrow'><i class='fa fa-angle-left fa-xl' aria-hidden='true'></i></span>",
    nextArrow:
      "<span class='next_arrow'><i class='fa-solid fa-chevron-right fa-xl'></i></span>",
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
});
