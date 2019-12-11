const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3200;
const cors = require("cors");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const io = socketIo(server);
const router = require("./router");
const {
  addPlayer,
  getPlayerInField,
  findNumber,
  getPlayer,
  removePlayer,
  addplayerstoField,
  getTwoPlayerinField
} = require("./players");
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

io.sockets.on("connection", visitor => {
  console.log("there is new visitor");
  visitor.on("new player", (playername, callback) => {
    console.log(typeof playername, playername);

    const { err, player } = addPlayer(visitor.id, playername);
    console.log(player);
    const isTrue = findNumber({ player });
    console.log(isTrue);

    if (err) return callback(err);
    visitor.join(player.field);

    visitor.emit(
      "welcome",
      {
        player: "player",
        text: `${player.name}, Welcome to Field ${player.field}.`
      },
      isTrue
    );
    visitor.broadcast.to(player.field).emit(
      "welcome",
      {
        player: "player",
        text: `${player.name} has joined to game!`
      },
      isTrue
    );
    io.to(player.field).emit("fieldData", {
      field: player.field,
      players: getPlayerInField(player.field)
    });

    // callback();
  });

  visitor.on("put pharse", (pharse, callback) => {
    const player = getPlayer(visitor.id);
    visitor.broadcast.to(player.field).emit("pharse", pharse);

    callback();
  });
  visitor.on("send result", result => {
    const player = getPlayer(visitor.id);
    visitor.broadcast.to(player.field).emit("result", result);
  });

  // two players

  visitor.on("two players", ({ name, field }, callback) => {
    console.log({ name, field });
    const { error, twoPlayer } = addplayerstoField({
      id: visitor.id,
      name,
      field
    });
    if (error) return callback(error);
    console.log(twoPlayer, "index 79", error);

    visitor.join(twoPlayer.field);

    visitor.emit("welcome two players", {
      player: "player",
      text: `${twoPlayer.name}, Welcome to Field ${twoPlayer.field}.`
    });
    visitor.broadcast.to(twoPlayer.field).emit("welcome two players", {
      player: "player",
      text: `${twoPlayer.name} has joined to game!`
    });
    io.to(twoPlayer.field).emit("twoPlayerFieldData", {
      field: twoPlayer.field,
      players: getTwoPlayerinField(twoPlayer.field)
    });
  });

  visitor.on("twoPlayers put pharse", (pharse, callback) => {
    const player = getPlayer(visitor.id);
    visitor.broadcast.to(player.field).emit("twoPlayers pharse", pharse);

    callback();
  });

  visitor.on("send resultTwoPlayers", result => {
    const player = getPlayer(visitor.id);
    visitor.broadcast.to(player.field).emit("resultTwoPlayers", result);
  });

  visitor.on("disconnect", () => {
    console.log("there is disconnected!");

    const leave = getPlayer(visitor.id);
    console.log(leave);

    visitor.broadcast.to(leave.field).emit("leaved", {
      player: "player",
      text: `${leave.name} has leaved from game!`
    });
    removePlayer(visitor);
  });
});

app.use(cors());
server.listen(PORT, () => {
  console.log(`Your Server is running on port ${PORT}`);
});
