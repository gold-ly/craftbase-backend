const url = require("url");
const jwt = require("jsonwebtoken");
const {WebSocketServer} = require("ws");
const wsServer = new WebSocketServer({noServer: true});
const {secretKey} = require("../index");

wsServer.broadcast = (msg) => {
    wsServer.clients.forEach((client) => {
        client.send(msg);
    });
};

const live = (req, socket, head) => {
    const parsedUrl = url.parse(req.url, true);
    const route = parsedUrl.pathname;
    const { token } = parsedUrl.query;

    jwt.verify(token, secretKey, (err, username) => {
        if(err || !username) {
            console.log("WebSocket connection denied, because of wrong token");
            socket.end();
            return;
        }

        console.log(`WebSocket connection with token ${token} established`);

        console.log(`Request on ${route}`);
        if(route === "/live") {
            wsServer.handleUpgrade(req, socket, head, (ws) => {
                const helloWorld = {
                    status: "success",
                };
                ws.send(JSON.stringify(helloWorld));
            });
        }
    });
};

module.exports = live;
module.exports.server = wsServer;