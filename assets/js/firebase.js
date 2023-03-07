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
  const admins = [
    {
      userName: "Eldaniz",
      password: "12345",
    },

    {
      userName: "Saleh",
      password: "12345",
    },
    {
      userName: "Irade",
      password: "12345",
    },

    {
      userName: "Faride",
      password: "12345",
    },
    {
      userName: "Mehman",
      password: "12345",
    },
  ];
  await set(ref(adminLogin, "/admins"), admins);

  adminLogine(JSON.parse(sessionStorage.getItem("admin")));
});


$("#admin-login-logo").on("click",function(e){
  e.preventDefault();

})


$("#admin-login-btn").on("click", function (e) {
  e.preventDefault();

  let adminLoginName = $("#admin-login-name");
  let adminLoginpassword = $("#admin-login-password");

  if (
    adminLoginName.val().trim().length <= 2 ||
    adminLoginName.val().trim() === "" ||
    adminLoginpassword.val().trim() === ""
  ) {
    $(".join-error").fadeIn(50);
    return;
  }

  let admin = {
    username: adminLoginName.val(),
    password: adminLoginpassword.val(),
  };

  setTimeout(function () {
    sessionStorage.setItem("admin", JSON.stringify(admin));
    adminLogine(JSON.parse(sessionStorage.getItem("admin")));
  },1);

  adminLoginName.val("");
  adminLoginpassword.val("");
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
      } 
      else {
        $(".join-error").fadeIn(10);
        return;
      }
    }
  );
}
