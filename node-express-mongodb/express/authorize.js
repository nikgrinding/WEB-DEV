const authorize = (req, res, next) => {
    const { user } = req.query;
    if (user === "nik") {
        req.user = { name: "nik", id: "87" };
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
};

module.exports = authorize;
