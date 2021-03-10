// SERVIDOR DE EXPRESS
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = http.createServer(this.app);

    this.io = socketio(this.server, {});
  }

  middlewares() {
    // DESPLEGAR EL DIR PÚBLICO
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // PARA QUE CUALQUIERA PUEDA ACCEDER
    this.app.use(cors());
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();

    this.configSockets();

    this.server.listen(this.port, () => {
      console.log(this.port);
    });
  }
}

module.exports = Server;
