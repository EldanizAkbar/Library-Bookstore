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
const adminLogin = getDatabase(app);

$(document).ready(async function (e) {
 
  await set(ref(adminLogin, "/admins"), admins);
  adminLogine(JSON.parse(localStorage.getItem("adminTrue")));


});

$("#admin-login-logo").on("click", function (e) {
  e.preventDefault();
});

$("#admin-login-btn").on("click", function (e) {
  e.preventDefault();
  let adminLoginName = $("#admin-login-name");
  let adminLoginPassword = $("#admin-login-password");
  
if( adminLoginName.val().trim() === "" && adminLoginPassword.val().trim() === "" ){
  $(".join-error #errorP").html("Please fill in the form");
  $(".join-error").fadeIn(10);
  return;


 }

  else if (
    adminLoginName.val().trim() === ""
    
  ) {
    $(".join-error #errorP").html("Username can not be empty");
    $(".join-error").fadeIn(10);
    return;
  }

 else if ( adminLoginPassword.val().trim() === "" 
 ){
  $(".join-error #errorP").html("Password is required");
  $(".join-error").fadeIn(10);
  return;
 }


  let admin = {
    username: adminLoginName.val(),
    password: adminLoginPassword.val(),
  };

  setTimeout(function () {
    localStorage.setItem("admin", JSON.stringify(admin));
    adminLogine(JSON.parse(localStorage.getItem("admin")));
  }, 1);

  adminLoginName.val("");
  adminLoginPassword.val("");
});



function adminLogine(form) {
  if (!form) {
    return;
  }

  onValue(ref(adminLogin, "/admins"), async (snapshot) => {
    const user = (await snapshot.val()) || {};

    if (!form) {
      return;
    }

    let flag = false;

    for (var i = 0; i < user.length; i++) {
      if (
        form.username == user[i].userName &&
        form.password == user[i].password
      ) {
        localStorage.setItem("adminTrue", JSON.stringify(form));
        flag = true;
      }
    }

    if (flag == true) {
      $(".join-error").fadeOut(50);
      $(".join-success").fadeIn(50);

      setTimeout(function () {
        document.location.href = "admin-panel.html";
      }, 500);

      return;
    } else {
      $(".join-error #errorP").html("Password or Username is incorrect");
      $(".join-error").fadeIn(10);
      return;
    }
  });
}
