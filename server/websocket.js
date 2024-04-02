const ws = require("ws");

const wss = new ws.Server({
    port: 5000,
}, () => console.log("Server started on port 5000"));

wss.on("connection", function connection(ws) {
    ws.on("message", function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case "message":
                broadcast(message);
                break;
            case "connection":
                broadcast(message);
                break;
        }
    })
})

function broadcast(message) {
    wss.clients.forEach(cl => {
        cl.send(JSON.stringify(message))
    })
}

const message = {
    event: "message/connection",
    id: 123,
    date: "01.04.2024",
    username: "Danila",
    message: "Hello World"
}