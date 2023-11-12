import express from "express";
import router from "./router.js";
import session from "express-session";

const app = express();

const port = 3000;

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

app.use('/', router);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});