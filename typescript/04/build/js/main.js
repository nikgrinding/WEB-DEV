let myName;
let username;
const add = (a, b) => {
    return a + b;
};
const logMessage = (message) => {
    console.log(message);
};
logMessage("hello");
logMessage(add(2, 3));
let subtract = function (c, d) {
    return c - d;
};
let multiply = (c, d) => {
    return c * d;
};
logMessage(multiply(2, 2));
const addAll = (a, b, c) => {
    if (typeof c !== "undefined") {
        return a + b + c;
    }
    return a + b;
};
const sumAll = (a, b, c = 2) => {
    return a + b + c;
};
logMessage(addAll(1, 2, 3));
logMessage(addAll(1, 2));
logMessage(sumAll(1, 2, 3));
logMessage(sumAll(1, 2));
const nums = (a, ...nums) => {
    return a + nums.reduce((prev, curr) => prev + curr);
};
const createError = (errMsg) => {
    throw new Error(errMsg);
};
const infinite = () => {
    return infinite();
};
const isNumber = (value) => {
    return typeof value === "number";
};
const numberOrString = (value) => {
    if (typeof value === "string")
        return "string";
    if (isNumber(value))
        return "number";
    return createError("This should never happen");
};
export {};
