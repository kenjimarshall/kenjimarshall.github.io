$(document).ready(function () {
  //   var nav_btns = document.getElementsByClassName("nav-btn");
  //   var n_btns = nav_btns.length;
  //   var locations = [
  //     "1/1",
  //     "1/2",
  //     "1/3",
  //     "1/4",
  //     "2/1",
  //     "2/2",
  //     "2/3",
  //     "2/4",
  //     "3/1",
  //     "3/2",
  //     "3/3",
  //     "3/4",
  //     "4/1",
  //     "4/2",
  //     "4/3",
  //     "4/4",
  //     "5/1",
  //     "5/2",
  //     "5/3",
  //     "5/4",
  //   ];
  //   // Shuffle array
  //   var shuffled = locations.sort(() => 0.5 - Math.random());
  //   var btn_locations = shuffled.slice(0, n_btns);
  //   for (i = 0; i < n_btns; i++) {
  //     nav_btns[i].style.gridArea = btn_locations[i];
  //     nav_btns[i].style.visibility = "visible";
  //   }

  //fade out
  $(".nav-btn").click(function (e) {
    e.preventDefault();
    $link = $(this).attr("href");
    $(".container").fadeOut(200, function () {
      window.location = $link;
    });
  });
});
