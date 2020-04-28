function clickEffect(e) {
    var d = document.createElement("div");
    d.className = "clickEffect";
    d.style.top = e.clientY - 10 + "px"; d.style.left = e.clientX - 10 + "px";
    document.body.appendChild(d);
    d.addEventListener('animationend', function () {
        d.parentElement.removeChild(d);
    }.bind(this));
}

document.addEventListener('click', clickEffect);

$(document).ready(function () { //fade out
    $(".nav-btn").click(function (e) {
        e.preventDefault();
        $link = $(this).attr("href");
        $(".container").fadeOut(200, function () {
            window.location = $link;
        });

    });
});

