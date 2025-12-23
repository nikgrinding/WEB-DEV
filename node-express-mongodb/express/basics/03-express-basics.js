const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.use((req, res) => {
    res.send("Page not Found");
});

app.listen(5000, () => {
    console.log("server is listening on port 5000");
});
