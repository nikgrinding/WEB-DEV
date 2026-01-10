let stringArray = ["one", "hey", "Nik"];
let college = [2023, 2027];
let mixedData = ["IPL", 2026, false];
mixedData[2] = 1;
mixedData.push(false);
college.unshift(2028);
mixedData = college;
let test = [];
let band = [];
test.push(0);
band.push("can't push 0");
let myTuple;
myTuple = ["nik", 2005, true];
let mixed = ["John", 1, false];
mixed = myTuple;
let myObj;
myObj = myTuple;
myObj = mixed;
myObj = {};
const tempObj = {
    prop1: "nik",
    prop2: true,
};
tempObj.prop2 = false;
let evh = {
    name: "Eddie",
    active: false,
    albums: [1984, 5150, "OU812"],
};
let jp = {
    name: "Jimmy",
    active: true,
    albums: ["I", "II", "IV"],
};
evh = jp;
const greetGuitarist = (guitarist) => {
    return `Hello ${guitarist.name?.toUpperCase()}!`;
};
console.log(greetGuitarist(jp));
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 10] = "U";
    Grade[Grade["D"] = 11] = "D";
    Grade[Grade["C"] = 12] = "C";
    Grade[Grade["B"] = 13] = "B";
    Grade[Grade["A"] = 14] = "A";
})(Grade || (Grade = {}));
console.log(Grade.U);
export {};
