import express from "express";
const router = express.Router();
import path from "path";
const __dirname = path.resolve();
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { addUserToDB } from "./mongoDB.js";

var jsonParser = bodyParser.json()

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/view/index.html");
});

router.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/view/login.html");
});

router.post('/login', jsonParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);

    let hash2 = "$2b$10$JT3j/fAXUujxTNC2jLWnW.d.lE8COgGoJxmAFx9rrM5/YW.OeDJJC"

    bcrypt.compare(password, hash2, function (err, result) {
        if (result) {
            console.log("Valid password");
            req.session.username = username; // Store the username in the session
            res.redirect('/dashboard'); // Redirect to the dashboard page
        }
        else {
            console.log("Invalid password");
            res.redirect('/login'); // Redirect to the login page
        }
    });
});

router.get('/dashboard', (req, res) => {
    if (req.session.username) { // Check if the username is stored in the session
        res.send(`Welcome ${req.session.username} to the dashboard`); // Display the username
    } else {
        res.redirect('/login'); // Redirect to the login page if the username is not stored in the session
    }
});


export default router;