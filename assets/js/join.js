window.addEventListener("scroll", function(){

    let div1=document.querySelector(".sticky-top");
    if(window.scrollY>0){
        div1.className="header-menu sticky-top"
       
    }
    else if(window.scrollY==0){
        div1.className="pt-3 sticky-top"
       
    }
  
  });


  $("#home-join-btn").on("click",async function (e) {

    e.preventDefault();
  
    let homeJoinName = $("#home-join-name");
    let homeJoinEmail = $("#home-join-email");
  
    if (
      homeJoinName.val().trim().length <= 2 ||
      homeJoinName.val().trim() === "" ||
      homeJoinEmail.val().trim() === "" ||
      !homeJoinEmail.val().trim().includes("@", ".")
    ) {
      $(".join-error").fadeIn(125);
      return;
    }

  

    $(".join-error").fadeOut(100);
    $(".join-success").fadeIn(125);

  
    homeJoinName.val("");
    homeJoinEmail.val("");
  
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  });


