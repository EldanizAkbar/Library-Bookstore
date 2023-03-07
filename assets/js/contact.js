function showError(errorElement,errorMessage){
    document.querySelector("."+errorElement).classList.add("display-error");
    document.querySelector("."+errorElement).innerHTML= errorMessage;

}

function clearError(){
    let errors = document.querySelectorAll(".error");
    for (let error of errors) {
         error.classList.remove("display-error")
    }
}

let form = document.forms["sign-up-form"];
form.onsubmit = function(event){
    clearError();
    if(form.email.value==""){
        showError("email-error","Please check all information")
   return false;
    }
    if(form.phone.value==""){
        showError("phone-error","Please check all information")
   return false;
    }
    if(form.username.value==""){
        showError("username-error","Please check all information")
   return false;
    }
    if(form.address.value==""){
        showError("address-error","Please check all information")
   return false;
    }
    document.querySelector(".success").classList.add("display-success");
    document.querySelector(".success").innerHTML = "Succesful";

    event.preventDefault();
}
