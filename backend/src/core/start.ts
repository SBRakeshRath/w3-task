import { Server } from "socket.io";
import { createServer, get } from "http";
import { configDotenv } from "dotenv";
import handleAddMember from "../events/add-member.js";
import mongoose from "../db/dbConnect.js";
import getLeaderBoard from "../events/get-leader-board.js";
import getAllUsersDB from "../db/getAllUsers.js";
import GetUserList from "../events/get-users-list.js";
import AddPoints from "../events/add-points.js";
configDotenv();
mongoose.connect(process.env.MONGO_URL);

const PORT = process.env.PORT || 3000;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  handleAddMember(socket);
  getLeaderBoard(socket);
  GetUserList(socket);
  AddPoints(socket);
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default io;
