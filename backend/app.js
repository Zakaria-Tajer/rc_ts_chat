const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/users");
const mailRoutes = require("./routes/mail");
const chatRoutes = require("./routes/chat");
const { addUsers, getAllRoomUsers, userDisconnect } = require("./socket");

const server = require("http").Server(app);
const io = require("socket.io")(server);

require("dotenv").config();

app.get("/", (req, res, next) => {
  res.send("working");
  // next()
});

let usersArray = [];

io.on("connection", (socket) => {
  console.log("Connected");
  // !First Connection
  socket.on("join-room", ({ roomId, userId, userFullName }) => {
    console.log(`${userFullName} joined room: ${roomId} id: ${userId}`);
    socket.join(roomId);
    addUsers(usersArray, roomId, userId, userFullName);
    socket.to(roomId).emit(`user-connected: ${userFullName}`);

    io.to(roomId).emit("all-users", getAllRoomUsers(usersArray, roomId));

    socket.on("disconnect", ({ roomId, userId }) => {
      socket.leave(roomId);
      userDisconnect(usersArray,userId);
      io.to(roomId).emit("all-users", getAllRoomUsers(roomId));
    });
  });
});




app.use(bodyParser.json());
app.use(cors());
app.use("/api", userRoutes);
app.use("/verification", mailRoutes);
app.use("/chat", chatRoutes);
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD}@cluster0.rjvw8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
