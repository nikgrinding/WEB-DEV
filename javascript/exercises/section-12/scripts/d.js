function run() {
    setTimeout(function() {
        document.querySelector(".js-button").innerHTML = "Finished!";
    }, 1000);
    document.querySelector(".js-button").innerHTML = "Loading...";
}