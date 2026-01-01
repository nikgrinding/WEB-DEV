require("dotenv").config();
const express = require("express");
const mainRouter = require("./routes/main");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/", mainRouter);
app.use((req, res) => {
    res.status(404).send("Route does not exist");
});
app.use(errorHandler);

const startApplication = async () => {
    try {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Backend is running at http://localhost:${port}`));
    } catch (error) {
        console.log(error);
    }
};

startApplication();
