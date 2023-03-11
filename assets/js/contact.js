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
const contactMember = getDatabase(app);

$("#contactBookBtn").on("click", async function (e) {
  e.preventDefault();

  let sendContact = false;

  let fullNameContact = $("#fullNameContact");
  let emailContact = $("#emailContact");
  let addressContact = $("#addressContact");
  let phoneContact = $("#phoneContact");
  if (fullNameContact.val().trim() === "") {
    sendContact = true;
    $("#contactError #errorP").html("Full name can not be empty");
    $("#contactError").fadeIn(150);
    return;
  } else if (emailContact.val().trim() === "") {
    sendContact = true;
    $("#contactError #errorP").html("Email can not be empty");
    $("#contactError").fadeIn(150);
    return;
  } else if (!emailContact.val().trim().includes("@", ".")) {
    sendContact = true;
    $("#contactError #errorP").html("Email should contain @");
    $("#contactError").fadeIn(150);
    return;
  } else if (addressContact.val().trim() === "") {
    sendContact = true;
    $("#contactError #errorP").html("Address can not be empty");
    $("#contactError").fadeIn(150);
    return;
  } else if (phoneContact.val().trim() === "") {
    sendContact = true;
    $("#contactError #errorP").html("Phone can not be empty");
    $("#contactError").fadeIn(150);
    return;
  }

  let member = {
    fullName: fullNameContact.val(),
    email: emailContact.val(),
    address: addressContact.val(),
    phone: phoneContact.val(),
  };

  // $("#contactBookBtn").on("click", async function (e) {
  //     e.preventDefault();

  //     let sendContact = false;

  //     let fullNameContact = $("#fullNameContact");
  //     let emailContact = $("#emailContact");
  //     let addressContact = $("#addressContact");
  //     let phoneContact = $("#phoneContact");

  //     if (
  //       fullNameContact.val().trim() === "" ||
  //       emailContact.val().trim() === "" ||
  //       !emailContact.val().trim().includes("@",".") ||
  //       addressContact.val().trim() === "" ||
  //       phoneContact.val().trim() === ""
  //     ) {
  //       sendContact = true;
  //       $("#contactError").fadeIn(150);
  //       return;
  //     }

  //     let member = {
  //       fullName: fullNameContact.val(),
  //       email: emailContact.val(),
  //       address: addressContact.val(),
  //       phone: phoneContact.val(),
  //     };

  const contactBranch = ref(contactMember, "/contacts");

  const key = push(contactBranch).key;
  const newBranch = ref(contactMember, "/contacts/" + key);

  await set(newBranch, member);

  if (!sendContact) {
    $("#contactError").fadeOut(150);
    $("#contactSuccess").fadeIn(150);
    $("#contactSuccess").fadeOut(2000);

    fullNameContact.val("");
    emailContact.val("");
    addressContact.val("");
    phoneContact.val("");
  }
});
