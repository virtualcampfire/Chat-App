const express = require("express");

const app = new express();

app.use(express.static('dist'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});