function run() {
    setInterval(function() {
        document.querySelector(".js-added-line").innerHTML = "";
    }, 2000);
    document.querySelector(".js-added-line").innerHTML = "Added";
}