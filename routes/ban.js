const { server } = require("./live");

const ban = (req, res) => {
    const uuid = req.body.uuid;
    const reason = req.body.reason;
    const duration = req.body.duration;

    if(!uuid || !reason || !duration) {
        res.status(400).end();
    }

    server.broadcast(JSON.stringify({
        action: "player-ban",
        player: {
            uuid,
            reason,
            duration
        },
    }));

    res.status(200).json({
        status: "new-ban"
    });
};

module.exports = ban;
