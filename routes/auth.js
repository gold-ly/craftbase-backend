const {secretKey} = require("../index");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    console.log("Auth Router got request...");

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        res.status(401).end();
        return;
    }

    jwt.verify(token, secretKey, (err, user) => {
        if(err) {
            console.log(`Received token ${token} from client, but it was wrong`);
            res.status(403).end();
            return;
        }

        console.log(`Client request from ${user.username} was successful`);
        next();
    });
};

module.exports = auth;
