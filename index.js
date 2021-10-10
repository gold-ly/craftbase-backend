const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
try {
    mongoose.connect(process.env.DEV_URI).then(() => {
        console.log("Connected to database");
    });
} catch (error) {
    console.log("Couldn't connect to database");
}

const secretKey = process.env.DEV_TOKEN || require("crypto").randomBytes(64).toString("hex");
module.exports.secretKey = secretKey;

const login = require("./routes/login");
const register = require("./routes/register");
const auth = require("./routes/auth");
const player = require("./routes/player");
const ban = require("./routes/ban");

const app = express();
const apiRouter = express.Router();

app.use(bodyParser.json());
app.use("/api", apiRouter);

apiRouter.use(auth);

apiRouter.post("/ban", ban);
apiRouter.post("/player", player);

app.post("/login", login);
app.post("/register", register);

app.listen(8080, () => {
    console.log("Listening on :8080...");
});


