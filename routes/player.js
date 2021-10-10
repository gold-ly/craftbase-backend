const Player = require("../models/player");

const player = (req, res) => {
    const uuid = req.body.uuid;

    Player.findOne({ uuid }, (err, player) => {
        if(err) {
            res.status(500).end();
            return;
        }

        if(!player) {
            const newPlayer = new Player({
                uuid: uuid,
                balance: 0,
                banned: false,
            });
            newPlayer.save();

            res.status(201).json(newPlayer).end();
            return;
        }

        res.json(player);
    });
};

module.exports = player;