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
const joinMember = getDatabase(app);

window.addEventListener("scroll", function () {
  let div1 = document.querySelector(".sticky-top");
  if (window.scrollY > 0) {
    div1.className = "header-menu sticky-top";
  } else if (window.scrollY == 0) {
    div1.className = "pt-3 sticky-top";
  }
});

$("#home-join-btn").on("click", async function (e) {
  e.preventDefault();

  let homeJoinName = $("#home-join-name");
  let homeJoinEmail = $("#home-join-email");

  if (
    homeJoinName.val().trim().length <= 2 ||
    homeJoinName.val().trim() === "" ||
    homeJoinEmail.val().trim() === "" ||
    !homeJoinEmail.val().trim().includes("@", ".")
  ) {
    $(".join-error").fadeIn(10);
    return;
  }

  let user = {
    username: homeJoinName.val(),
    email: homeJoinEmail.val(),
  };

  const membersBranch = ref(joinMember, "/users");

  const key = push(membersBranch).key;
  const newBranch = ref(joinMember, "/users/" + key);

  await set(newBranch, user);

  $(".join-error").fadeOut();
  $(".join-success").fadeIn(10);

  homeJoinName.val("");
  homeJoinEmail.val("");

  setTimeout(function () {
    window.location.reload();
  }, 1000);
});
