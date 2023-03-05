$("#home-join-btn").on("click", function (e) {
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
