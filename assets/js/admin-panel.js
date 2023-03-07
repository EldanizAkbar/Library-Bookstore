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


