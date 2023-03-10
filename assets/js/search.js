$('.rightPartOnSearch').slick({
    dots: true,
    infinite: false,
    prevArrow : false,
    nextArrow : false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
            prevArrow : false,
            nextArrow : false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
            prevArrow : false,
            nextArrow : false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
            prevArrow : false,
            nextArrow : false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  });