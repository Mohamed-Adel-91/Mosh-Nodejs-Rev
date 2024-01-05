const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "My Express App",
        message: `Server Listening on Port ${port} , Hello World!`,
    });
});

module.exports = router;
