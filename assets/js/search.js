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
$("#btn-search").on("click", async function (e) {
  e.preventDefault();
  let search = $("#search-input");

  if (search.val().trim() === "") {
    $("#searchSuccess").fadeOut(10);
    $("#searchError #errorP").html("Field can not be empty");
    $("#searchError").fadeIn(150);
    search.val("");
    return;
  } else if (search.val().length < 3) {
    $("#searchSuccess").fadeOut(10);
    $("#searchError #errorP").html("Can not search less than 3 strings");
    $("#searchError").fadeIn(150);
    search.val("");
    return;
  } else if (search.val().length > 22) {
    $("#searchSuccess").fadeOut(10);
    $("#searchError #errorP").html("Can not search more than 22 strings");
    $("#searchError").fadeIn(150);
    search.val("");
    return;
  }

  let searchInput = $("#search-input").val();

  onValue(ref(db, "/books"), async (snapshot) => {
    $("#first").slick("removeSlide", null, null, true);
    var f = false;
    var booksJson = await snapshot.val();
    let bookID = 1;
    for (var index in booksJson) {
      var book = booksJson[index];

      var description = book.description.substring(0, 400) + "...";
      var div = `
        <div class="box">
           <div class="row">
             <div class="col-lg-5 col-6 p-3">
               <img src="${book.imageUrl}" width="100%" alt="" />
             </div>
             <div class="col-lg-7 p-2 read-more-container">
               <h2>${book.title}</h2>
               <p>${book.authorName}</p>
               <p id="read-more">
               ${description}
               <span class ="read-more-text">${book.description}</span>
               </p>
               <span class="read-more-btn">Read More...</span>
             </div>
           </div>
        </div>
      `;
      var re = new RegExp(searchInput, "i");
      if (book.hasOwnProperty("title") && book.title.search(re) > -1) {
        $("#first").slick("slickAdd", div);
        f = true;
      }

      bookID++;
    }

    if (f) {
      $("#searchError").fadeOut(10);
      $("#searchSuccess").fadeIn(150);
      $("#searchSuccess").fadeOut(3000);
    } else {
      $("#searchSuccess").fadeOut(10);
      $("#searchError #errorP").html(
        "No any movies or series with this name in our database"
      );
      $("#searchError").fadeIn(150);
    }
  });
});
$(document).ready(function () {
  getData();

  setTimeout(readMore, 1000);

  $(".rightPartOnSearch").slick({
    arrows: true,
    prevArrow:
      "<span  class='priv_arrow'><i class='fa fa-chevron-left fa-xl' aria-hidden='true'></i></span>",
    nextArrow:
      "<span class='next_arrow'><i class='fa-solid fa-chevron-right fa-xl'></i></span>",
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplaySpeed: 2000,
  });
});

function getData() {
  onValue(ref(db, "/books"), async (snapshot) => {
    var booksJson = await snapshot.val();
    let bookID = 1;
    for (var index in booksJson) {
      var book = booksJson[index];

      var description = book.description.substring(0, 400) + "...";
      var div = `
        <div class="box">
           <div class="row p-3">
             <div class="col-lg-5 col-6 p-3">
               <img src="${book.imageUrl}" width="100%" alt="" />
             </div>
             <div class="col-lg-7 p-2 read-more-container">
               <h2 class="mb-0">${book.title}</h2>
               <p class="slider-aname">${book.authorName}</p>
               <p id="read-more">
               ${description}
               <span class ="read-more-text">${book.description}</span>
               </p>
               <span class="read-more-btn">Read More...</span>
             </div>
           </div>
        </div>
      `;

      $(".rightPartOnSearch").slick("slickAdd", div);
      bookID++;
    }
  });
}

setTimeout(function () {
  const elements = document.querySelector("#url");

  elements.classList.add("d-none");
}, 2000);

function readMore() {
  const parentContainer = document.querySelector(".rightPartOnSearch");

  parentContainer.addEventListener("click", (event) => {
    const current = event.target;

    const isReadMoreBtn = current.className.includes("read-more-btn");

    if (!isReadMoreBtn) return;

    const currentText =
      event.target.parentNode.querySelector(".read-more-text");

    currentText.classList.toggle("read-more-text--show");

    current.textContent = current.textContent.includes("Read More")
      ? "Read Less..."
      : "Read More...";
  });
}
