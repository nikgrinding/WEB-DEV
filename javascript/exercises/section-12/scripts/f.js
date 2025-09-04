let intervalId = null;
function run() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(function() {
        document.querySelector(".js-added-line").innerHTML = "";
    }, 2000);
    document.querySelector(".js-added-line").innerHTML = "Added";
}