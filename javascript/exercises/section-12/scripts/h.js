let messages = 2;

setInterval(function() {
    if (document.title === '12-h') {
        document.title = `(${messages}) notifications`;
    } else {
        document.title = '12-h';
    }
}, 1000);

function count(value) {
    messages += value;
}