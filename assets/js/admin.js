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

let searchInput = $("#searchAdminInput");
let bookNameInput = $("#bookName");
let authorNameInput = $("#authorName");
let bookImageUrlInput = $("#bookImageUrl");
let bookDescriptionInput = $("#bookDescription");
let bookTypeInput = $("#bookType");
let btnAdd = $("#btnAdd");
let btnSearch = $("#btnSearch");
let bookAverageRating = null;
let bookPublishedDate = null;
var api_key = "AIzaSyDnhpW5yU5h_K0fvcceCz9lPe0cw3YtumI";
let booksCount = 0;
onValue(ref(db, "/booksCount"), async (snapshot) => {
  booksCount = (await snapshot.val()) || 0;
});

$(btnSearch).on("click", function (e) {
  e.preventDefault();

  if (searchInput.val().trim() === "") {
    $(".search-join-error #errorBookP").html("Search input can not be empty");
    $(".search-join-error").fadeIn(10);
    return;
  }
  else if(searchInput.val().trim().length <= 2){
    
   $(".search-join-error #errorBookP").html("Can not search less than 3 symbols");
   $(".search-join-error").fadeIn(10);
   return;

  }

  

  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchInput.val()}&key=${api_key}`
  )
    .then((response) => response.json())
    .then((result) => {
      var volumeInfo = result.items[0].volumeInfo;
      bookNameInput.val(volumeInfo.title);
      authorNameInput.val(volumeInfo.authors[0]);
      bookImageUrlInput.val(volumeInfo.imageLinks.thumbnail);
      bookDescriptionInput.val(volumeInfo.description);
      bookTypeInput.val(volumeInfo.categories[0]);
      if (volumeInfo.hasOwnProperty("averageRating")) {
        bookAverageRating = volumeInfo.averageRating;
      }
      if (volumeInfo.hasOwnProperty("publishedDate")) {
        bookPublishedDate = volumeInfo.publishedDate;
      }
      if(bookNameInput.val().trim() === ""){
        $(".search-join-error #errorBookP").html("There is no book with this name");
        $(".search-join-error").fadeIn(10);
        return;
      }
  
   

    });
    
    $(".search-join-error").fadeOut();
    $(".search-join-success").fadeIn(10);
    $(".search-join-success").fadeOut(1500);

     





});

$(btnAdd).on("click", async function (e) {
  e.preventDefault();

  if (
    bookNameInput.val().trim().length <= 3 ||
    bookNameInput.val().trim() === "" ||
    authorNameInput.val().trim().length <= 5 ||
    authorNameInput.val().trim() === "" ||
    bookImageUrlInput.val().trim().length <= 10 ||
    bookImageUrlInput.val().trim() === "" ||
    bookDescriptionInput.val().trim().length <= 10 ||
    bookDescriptionInput.val().trim() === ""
  ) {
    $(".add-join-error").fadeIn(10);
    return;
  }

  $(".add-join-error").fadeOut(10);

  $(".add-join-success").fadeIn(15);
  $(".add-join-success").fadeOut(1500);

  await set(ref(db, "/booksCount"), ++booksCount);

  var bookJson = {
    title: bookNameInput.val(),
    authorName: authorNameInput.val(),
    imageUrl: bookImageUrlInput.val(),
    description: bookDescriptionInput.val(),
    type: bookTypeInput.val(),
    averageRating: bookAverageRating,
    publishedDate: bookPublishedDate,
  };

  await set(ref(db, `/books/${booksCount}`), bookJson);
  bookNameInput.val("");
  authorNameInput.val("");
  bookImageUrlInput.val("");
  bookDescriptionInput.val("");
  bookTypeInput.val("");
  searchInput.val("");
});
