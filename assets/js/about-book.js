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
const comments = getDatabase(app);
const db = getDatabase(app);

$(document).ready(function () {
 
    var book = JSON.parse(localStorage.getItem("selectedBook"));

 
   
      var div = `
         
      <div class="row justify-content-between mt-5 align-items-center">
      <div class="col-md-6 pb-5">
        <div class="year-con mb-4">
          <span class="year p-2 px-3">${book.publishedDate.slice(0,4)}</span>
        </div>
        <div class="about-title">
          <h1 id="" class="p-0 m-0 mt-3">${book.title}</h1>
        </div>
        <div class="about-title mb-2">
          <span id="">2 days ago added</span>
        </div>
        <div class="about-title mb-3"><h4 id="">${book.authorName}</h4></div>
        <p class="about-desc" id=""> ${book.description}
        </p>
      </div>
      <div class="col-md-5 col-lg-6 pb-5 text-center text-xl-end">
        <img class="img-fluid w-50" src="${book.imageUrl}" id="" />
      </div>
    </div>

          `;
      $("#aboutBook").append(div);



    
   

});












































$("#send-comment").on("click", async function (e) {
  e.preventDefault();

  let comment = $("#comment-input");

  if (
    comment.val().trim().length <= 2 ||
    comment.val().trim() === "" 
  ) {
    $(".join-error").fadeIn(10);
    return;
  }


  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
   
  const utc = localTime + localOffset;
  const offset = 4; // UTC of Baku is +04.00
  const baku = utc + (3600000 * offset);
   
  const bakuTimeNow = new Date(baku).toLocaleString();

  let userComment = {
    comment: comment.val() ,
    time:bakuTimeNow };

  const commentsBranch = ref(comments, "/comments");

  const key = push(commentsBranch).key;
  const newBranch = ref(comments, "/comments/" + key);

  await set(newBranch, userComment);

  $(".join-error").fadeOut();
  $(".join-success").fadeIn(10);

  $(".join-success").fadeOut(2000);

  comment.val("");

//   setTimeout(function () {
//     window.location.reload();
//   }, 1000);
});



let commentsContainer = $("#comments-container");

onValue(ref(comments, "/comments"), async (snapshot) => {
  const comment = (await snapshot.val()) || {};
  let array = Object.entries(comment);

  let data = array.map((item) => {
    return {
      id: item[0],
      ...item[1],
    };

  });
  commentsContainer.html(
    data
      .map(
        (user) => `
        <div class="row justify-content-center justify-content-lg-start mt-5">
        <div
          class="col-12 col-md-8 col-lg-6 d-flex justify-content-center justify-content-lg-start"
        >
         <div class="comments w-100 px-3 py-4">
          <div class="d-flex anonim align-items-center mb-3">
            <p class="mb-0">anonim</p> <span class="ms-4 mb-0">${user.time}</span>
          </div>
          <div class="express">
            <p>${user.comment}</p>
          </div>
         </div>
         
        </div>
      </div>

    `
      )
      .join("")
  );
});
