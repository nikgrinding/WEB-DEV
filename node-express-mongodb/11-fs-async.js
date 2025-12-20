const { readFile, writeFile } = require("fs");

readFile("./content/first.txt", "utf-8", (error, result) => {
    if (error) {
        console.log("Unfortunately, an error occured.\n", error);
        return;
    }
    const first = result;
    readFile("./content/second.txt", "utf-8", (error, result) => {
        if (error) {
            console.log("Unfortunately, an error occured.\n", error);
            return;
        }
        const second = result;
        writeFile("./content/result-async", `here is the result: ${first}, ${second}\n`, (error, result) => {
            if (error) {
                console.log("Unfortunately, an error occured.\n", error);
                return;
            }
            console.log(result);
        });
    });
});
