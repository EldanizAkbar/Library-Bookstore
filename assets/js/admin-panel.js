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
const aboutAdmin = getDatabase(app);
const joinMember = getDatabase(app);

var logOut = $("#adminLogout");

logOut.on("click", function () {
  sessionStorage.clear();
});

if (JSON.parse(sessionStorage.getItem("admin"))) {
  var adminName = JSON.parse(sessionStorage.getItem("admin"));
  console.log(adminName);

  $(".admin-name").text(adminName.username);
}

let joinTable = $("#joinTable");

onValue(ref(joinMember, "/users"), async (snapshot) => {
  const user = (await snapshot.val()) || {};
  let array = Object.entries(user);

  let data = array.map((item) => {
    return {
      id: item[0],
      ...item[1],
    };
  });
  joinTable.html(
    data
      .map(
        (user, index) => `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${user.username}</td>
            <td>${user.email}</td>
         </tr>

    `
      )
      .join("")
  );
});



let contactTable = $("#contactTable");

onValue(ref(joinMember, "/contacts"), async (snapshot) => {
  const contact = (await snapshot.val()) || {};
  let array = Object.entries(contact);

  let data = array.map((item) => {
    return {
      id: item[0],
      ...item[1],
    };
  });
  contactTable.html(
    data
      .map(
        (user, index) => `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${user.fullName}</td>
            <td>${user.address}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
         </tr>

    `
      )
      .join("")
  );
});





$(document).ready(function (e) {
var check = JSON.parse(sessionStorage.getItem("admin"));
if (!check) {
  document.location.href = "admin-login.html";
  return;
}
else{
  return;
}

});


$("#admin-about-store").on("click", async function (e) {
  e.preventDefault();

  let adminAboutTitle = $("#nameInputTitle");
  let adminAboutDesc = $("#nameInputDesc");
  let adminAboutUrl = $("#nameInputUrl");

  if (
    adminAboutTitle.val().trim().length <= 2 ||
    adminAboutDesc.val().trim() === "" ||
    adminAboutUrl.val().trim() === "" 
  ) {
    $(".join-error").fadeIn(10);
    return;
  }

  let about = {
    title: adminAboutTitle.val(),
    desc: adminAboutDesc.val(),
    url: adminAboutUrl.val(),
  };

  await set(ref(aboutAdmin, "/about"), about);
  $(".join-error").fadeOut();
  $(".join-success").fadeIn(10);

  adminAboutTitle.val("");
  adminAboutDesc.val("");
  adminAboutUrl.val("");


  setTimeout(function () {
    $(".join-error").fadeOut();
  $(".join-success").fadeOut();
  }, 1000);

});




















































 


$("#menuIconForMobile").click(function(){

  if($(".overlay").css("display")=="none"){
    $(".overlay").css("display","block");
    $("#menuIconForMobile").removeClass("fa-solid fa-bars").addClass("fa-solid fa-xmark");
  
 }
 else{
    $(".overlay").css("display","none");
    $("#menuIconForMobile").removeClass("fa-solid fa-xmark").addClass("fa-solid fa-bars");
 }


if($("#admin-panel-menuForMobile").css("display")=="none"){
   $("#admin-panel-menuForMobile").css("display","block");
   $("#menuIconForMobile").removeClass("fa-solid fa-bars").addClass("fa-solid fa-xmark");
}
else{
   $("#admin-panel-menuForMobile").css("display","none");
   $("#menuIconForMobile").removeClass("fa-solid fa-xmark").addClass("fa-solid fa-bars");
}
})
$("#homeForMobile").click(function(){
if($("#admin-panel-menuForMobile").css("display")=="block"){
  $("#admin-panel-menuForMobile").css("display","none");
  $("#menuIconForMobile").removeClass("fa-solid fa-xmark").addClass("fa-solid fa-bars");

}
})
$("#homeForMobile").click(function(){
if($("#admin-panel-menuForMobile").css("display")=="block"){
  $("#admin-panel-menuForMobile").css("display","none");
  $("#menuIconForMobile").removeClass("fa-solid fa-xmark").addClass("fa-solid fa-bars");

}
})
$("#aboutForMobile").click(function(){

if($("#admin-panel-menuForMobile").css("display")=="block"){
  $("#admin-panel-menuForMobile").css("display","none");
  $("#menuIconForMobile").removeClass("fa-solid fa-xmark").addClass("fa-solid fa-bars");

}
})
$("#joinUsForMobile").click(function(){

if($("#admin-panel-menuForMobile").css("display")=="block"){
  $("#admin-panel-menuForMobile").css("display","none");
  $("#menuIconForMobile").removeClass("fa-solid fa-xmark").addClass("fa-solid fa-bars");

}
})
$("#contactForMobile").click(function(){

if($("#admin-panel-menuForMobile").css("display")=="block"){
  $("#admin-panel-menuForMobile").css("display","none");
  $("#menuIconForMobile").removeClass("fa-solid fa-xmark").addClass("fa-solid fa-bars");

}
})

$("#logoutForMobile").click(function(){

  sessionStorage.clear();

if($("#admin-panel-menuForMobile").css("display")=="block"){
  $("#admin-panel-menuForMobile").css("display","none");
  $("#menuIconForMobile").removeClass("fa-solid fa-xmark").addClass("fa-solid fa-bars");

}
})