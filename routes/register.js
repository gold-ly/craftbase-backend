const bcrypt = require("bcrypt");
const User = require("../models/user");

const register = async (req, res) => {
    const username = req.body.username;
    const rawPassword = req.body.password;

    if(!username || !rawPassword) {
        res.status(400).end();
    }
    User.findOne({ username: username }, (err, user) => {
        if(err) res.status(500).end();

        if(!user) {
            bcrypt.hash(rawPassword, 12, (err, hash) => {
                if(err) {
                    res.status(500).end();
                    return;
                }

                const newUser = new User({ username: username, password: hash });
                newUser.save().then(() => {
                    res.status(201).json({
                        status: "User created"
                    }).end();
                });
            })



        } else {
            res.status(409).json({
                status: "Username exists"
            });
        }
    });
};

module.exports = register;
