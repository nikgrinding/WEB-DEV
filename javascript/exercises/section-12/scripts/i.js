let messages = 2;
let intervalId;

function changeTitle() {
    intervalId = setInterval(function() {
        if (document.title === '12-i') {
            document.title = `(${messages}) notifications`;
        } else {
            document.title = '12-i';
        }
    }, 1000);
}

function count(value) {
    if (messages + value >= 0) {
        messages += value;
        if (!intervalId) {
            changeTitle();
        }
    }
    if (!messages){
        clearInterval(intervalId);
        document.title = "12-i";
        intervalId = null;
    }
}

count(0);