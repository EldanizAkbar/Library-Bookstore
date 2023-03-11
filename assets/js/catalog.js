import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  get,
  set,
  ref,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAXML6Pu8ZQYiBXczoY1i7ffpWUb1i-BIk",
  authDomain: "alpha-library-bookstore.firebaseapp.com",
  databaseURL: "https://alpha-library-bookstore-default-rtdb.firebaseio.com",
  projectId: "alpha-library-bookstore",
  storageBucket: "alpha-library-bookstore.appspot.com",
  messagingSenderId: "117848842273",
  appId: "1:117848842273:web:f35b7d478136ce2517c360",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

$(".search-title").on("click", async function (e) {
  getData();
});

$(".categorize").on("click", async function (e) {
  const elements = document.querySelectorAll(".categorize");

  elements.forEach((element) => {
    element.classList.remove("header-actived");
  });

  $(this).addClass("border-0 bg-transparent categorize header-actived");

  onValue(ref(db, "/books"), async (snapshot) => {
    $("#first").slick("removeSlide", null, null, true);

    var booksJson = await snapshot.val();
    for (var index = 1; index < booksJson.length; index++) {
      var book = booksJson[index];
      if (book.title.length > 15 || book.authorName.length > 15) {
        var newTitle = book.title.substring(0, 12) + "...";
        var newAuthor = book.authorName.substring(0, 12) + "...";
        var bookID = index;
      }
      var div = `
      <div>
        <div class="card p-4 text-center rounded-0">
          <div class="img-wrapper">
            <img
              src="${book.imageUrl}"
              class="d-block w-80"
              alt="..."
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">${newTitle}</h5>
            <p class="card-text">${newAuthor}</p>
            <a href="../pages/aboutBook.html" id="${bookID}" class="btn bg-orange">Read More</a>
          </div>
        </div>
      </div>
      `;

      if (
        book.hasOwnProperty("type") &&
        book.type.includes(this.innerHTML.replace(/\s/g, ""))
      ) {
        $("#first").slick("slickAdd", div);
      }
      $(".bg-orange").on("click", async function (e) {
        let bookId = $(this).attr("id");
        var selectedBookJson = {};
        await onValue(ref(db, `/books/${bookId}`), async (snapshot) => {
          selectedBookJson = await snapshot.val();
          localStorage.setItem(
            "selectedBook",
            JSON.stringify(selectedBookJson)
          );
        });
      });
    }
  });
});
$(document).ready(function () {
  getData();
  const myTimeout = setTimeout(myStopFunction, 3000);

  function myStopFunction() {
    $(".bg-orange").on("click", async function (e) {
      let bookId = $(this).attr("id");
      var selectedBookJson = {};
      await onValue(ref(db, `/books/${bookId}`), async (snapshot) => {
        selectedBookJson = await snapshot.val();
        localStorage.setItem("selectedBook", JSON.stringify(selectedBookJson));
      });
    });
  }

  $(".responsive").slick({
    dots: true,
    // infinite: true,
    arrows: true,
    prevArrow:
      "<span  class='priv_arrow'><i class='fa fa-angle-left fa-xl' aria-hidden='true'></i></span>",
    nextArrow:
      "<span class='next_arrow'><i class='fa-solid fa-chevron-right fa-xl'></i></span>",
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 2,
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
    ],
  });
});

function getData() {
  onValue(ref(db, "/books"), async (snapshot) => {
    var booksJson = await snapshot.val();
    let bookID = 1;
    for (var index in booksJson) {
      var book = booksJson[index];
      if (book.title.length > 15 || book.authorName.length > 15) {
        var newTitle = book.title.substring(0, 12) + "...";
        var newAuthor = book.authorName.substring(0, 12) + "...";
      }
      var div = `
    <div>
      <div class="card p-4 text-center rounded-0">
        <div class="img-wrapper">
          <img
            src="${book.imageUrl}"
            class="d-block w-80"
            alt="..."
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">${newTitle}</h5>
          <p class="card-text">${newAuthor}</p>
          <a href="../pages/aboutBook.html" id="${bookID}" class="btn bg-orange">Read More</a>
        </div>
      </div>
    </div>
    `;

      $("#first").slick("slickAdd", div);

      if (
        book.hasOwnProperty("averageRating") &&
        parseInt(book.averageRating) > 3
      ) {
        $("#bestSeller").slick("slickAdd", div);
      }
      const publishedDate = Date.parse(book.publishedDate);
      const dateForCompare = new Date("2012");
      if (
        book.hasOwnProperty("publishedDate") &&
        publishedDate > dateForCompare
      ) {
        $("#newReleases").slick("slickAdd", div);
      }
      bookID++;
    }
  });
}

var category = document.querySelectorAll(".categorize");
console.log(category.length);
var mas = [];

for (var i = 0; i < category.length; i++) {
  mas.push(category[i].innerText);
}

localStorage.setItem("categories", JSON.stringify(mas));
