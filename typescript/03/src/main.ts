let stringArray = ["one", "hey", "Nik"];

let college = [2023, 2027];

let mixedData = ["IPL", 2026, false];

mixedData[2] = 1;
mixedData.push(false);

college.unshift(2028);

mixedData = college;

let test = [];
let band: string[] = [];

test.push(0);
band.push("can't push 0");

let myTuple: [string, number, boolean];
myTuple = ["nik", 2005, true];

let mixed = ["John", 1, false];

mixed = myTuple;

let myObj: object;
myObj = myTuple;
myObj = mixed;
myObj = {};

const tempObj = {
    prop1: "nik",
    prop2: true,
};

tempObj.prop2 = false;

interface Guitarist {
    name?: string;
    active: boolean;
    albums: (string | number)[];
}

let evh: Guitarist = {
    name: "Eddie",
    active: false,
    albums: [1984, 5150, "OU812"],
};

let jp: Guitarist = {
    name: "Jimmy",
    active: true,
    albums: ["I", "II", "IV"],
};

evh = jp;

const greetGuitarist = (guitarist: Guitarist) => {
    return `Hello ${guitarist.name?.toUpperCase()}!`;
};

console.log(greetGuitarist(jp));

enum Grade {
    U = 10,
    D,
    C,
    B,
    A,
}
console.log(Grade.U);
