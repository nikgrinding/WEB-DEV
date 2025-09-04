let add = function() {
    console.log(2 + 3);
}
let runTwice = function(param) {
    param();
    param();
}

runTwice(function() {console.log('12b');});
runTwice(add);