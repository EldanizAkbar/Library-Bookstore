var logOut=$("#adminLogout");

logOut.on("click",function(){
    sessionStorage.clear();
  })

 
if(JSON.parse(sessionStorage.getItem("admin"))){
    var adminName=JSON.parse(sessionStorage.getItem("admin"));
    console.log(adminName)
    
    $(".admin-name").text(adminName.username);
}

