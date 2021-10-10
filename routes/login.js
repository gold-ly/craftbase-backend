const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {secretKey} = require("../index");
const User = require("../models/user");

let login = (req, res) => {
    console.log(`Imported secret key is ${secretKey}`);

    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        console.log("Client request denied, no username or password");
        res.status(401).end();
        return;
    }

    User.findOne({ username: username }, (err, user) => {
        console.log(`Searching for ${username}`);

        if(err) {
            res.status(500).end();
            return;
        }

        if(!user) {
            res.status(404).json({
                status: "User not found"
            }).end();
            return;
        }

        const userPassword = user.password;
        console.log("Comparing passwords");
        bcrypt.compare(password, userPassword, (err, result) => {
            console.log(`Compared passwords, the result is ${result}`);
            if(err) {
                res.status(500).end();
                return;
            }

            if(result === true) {
                const userObject = {
                    username: username,
                };

                const token = jwt.sign(userObject, secretKey, { expiresIn: "1d" });
                console.log("Client request accepted, responding with token");
                res.json({ token });
            } else {
                res.status(403).json({
                    status: "Wrong password"
                });
            }
        })
    });


};

module.exports = login;
