type stringOrNumber = string | number;

type stringOrNumberArray = (string | number)[];

type Guitarist = {
    name?: string;
    active: boolean;
    albums: stringOrNumberArray;
};

type userId = stringOrNumber;

let myName: "nik";

let username: "nik" | "nick";

const add = (a: number, b: number): number => {
    return a + b;
};

const logMessage = (message: any): void => {
    console.log(message);
};

logMessage("hello");
logMessage(add(2, 3));

let subtract = function (c: number, d: number) {
    return c - d;
};

type mathFunction = (a: number, b: number) => number;

let multiply: mathFunction = (c, d) => {
    return c * d;
};

logMessage(multiply(2, 2));

interface mathFunctionInterface {
    (a: number, b: number): number;
}

const addAll = (a: number, b: number, c?: number): number => {
    if (typeof c !== "undefined") {
        return a + b + c;
    }
    return a + b;
};

const sumAll = (a: number, b: number, c: number = 2) => {
    return a + b + c;
};

logMessage(addAll(1, 2, 3));
logMessage(addAll(1, 2));
logMessage(sumAll(1, 2, 3));
logMessage(sumAll(1, 2));

const nums = (a: number, ...nums: number[]): number => {
    return a + nums.reduce((prev, curr) => prev + curr);
};

const createError = (errMsg: string): never => {
    throw new Error(errMsg);
};

const infinite = () => {
    return infinite();
};

const isNumber = (value: any): boolean => {
    return typeof value === "number";
};

const numberOrString = (value: stringOrNumber): string => {
    if (typeof value === "string") return "string";
    if (isNumber(value)) return "number";
    return createError("This should never happen");
};
