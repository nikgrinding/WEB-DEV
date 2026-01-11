let a = "hello";
let b = a;
let c = b;
let d = "world";
let e = "world";
const addOrConcat = (a, b, c) => {
    if (c === "add") {
        return a + b;
    }
    return "" + a + b;
};
let myVal = addOrConcat(2, 2, "concat");
let nextVal = addOrConcat(2, 2, "add");
const img = document.querySelector("img");
const myImg = document.getElementById("#img");
const nextImg = document.getElementById("#img");
img.src;
myImg.src;
nextImg.src;
export {};
