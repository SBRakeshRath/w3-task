import { Socket } from "socket.io";
import CreateRes from "../helpers/createResponse.js";
import getLeaderBoardDB from "../db/getLeaderBoard.js";

export default async function getLeaderBoard(Socket: Socket) {
  Socket.on("get-leader-board", async () => {
    try {
      const leaderboard = await getLeaderBoardDB()


      const response = CreateRes(
        true,
        "Leaderboard fetched successfully",
        leaderboard
      );

      Socket.emit("leader-board-response", response);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      const response = CreateRes(false, "Failed to fetch leaderboard");
      Socket.emit("leader-board-response", response);
    }
  });
}
