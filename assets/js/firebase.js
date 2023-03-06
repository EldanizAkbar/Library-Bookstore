import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, get, set, ref, push, remove, onValue } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js';


const firebaseConfig = {
    apiKey: "AIzaSyAXML6Pu8ZQYiBXczoY1i7ffpWUb1i-BIk",
    authDomain: "alpha-library-bookstore.firebaseapp.com",
    databaseURL: "https://alpha-library-bookstore-default-rtdb.firebaseio.com",
    projectId: "alpha-library-bookstore",
    storageBucket: "alpha-library-bookstore.appspot.com",
    messagingSenderId: "117848842273",
    appId: "1:117848842273:web:f35b7d478136ce2517c360"
  };

const app = initializeApp(firebaseConfig);
const adminLogin = getDatabase(app);


$(document).ready(async function(e){

    const admins=[
        {
            userName: "Eldaniz",
            password: "12345"
        },

        {
            userName: "Saleh",
            password: "1234"
        },
        {
            userName: "Irade",
            password: "123"
        },

        {
            userName: "Faride",
            password: "1234"
        },
        {
            userName: "Mehman",
            password: "1234"
        }

    ]
    await set(ref(adminLogin, '/admins'), admins);

    adminLogine(JSON.parse(sessionStorage.getItem("admin")));

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
      $(".join-error").fadeIn(125);
      return;
    }
  
    $(".join-error").fadeOut(100);
    $(".join-success").fadeIn(125);
   

    let admin = {
        username: adminLoginName.val(),
        password: adminLoginpassword.val(),
      };

  
    setTimeout(function () {
        sessionStorage.setItem("admin", JSON.stringify(admin));
        adminLogine(JSON.parse(sessionStorage.getItem("admin")));
    }, 500);
  
    adminLoginName.val("");
    adminLoginpassword.val("");

  });




  function adminLogine(form) {


    if (!form) {
       
      return;
    }


    onValue(ref(adminLogin, '/admins'), async snapshot => {
        const user = await snapshot.val() || {};

        let flag=false;
       
           for(var i=0;i<user.length;i++){
            if(form.username==user[i].userName && form.password==user[i].password){
                flag=true;
       
             
            }
     
            if(flag==true){
             
              document.location.href="../../index.html";
               $(".admin-success").fadeIn(125);
              return;
            }
            else{
              $(".join-success").fadeOut(0);
              $(".join-error").fadeIn(100);
            }
          

  }




    });


  }
  




























