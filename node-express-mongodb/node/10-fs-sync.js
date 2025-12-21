const { readFileSync, writeFileSync } = require("fs");
console.log("start");

const first = readFileSync("./content/first.txt", "utf-8");
const second = readFileSync("./content/second.txt", "utf-8");
console.log(first, second);

writeFileSync("./content/result-sync.txt", `here is the result: ${first}, ${second}\n`);
writeFileSync("./content/result-sync.txt", `let's try appending\n`, { flag: "a" });

console.log("done with the task");
console.log("starting the next one");
