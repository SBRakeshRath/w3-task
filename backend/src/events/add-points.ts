import { Socket } from "socket.io";
import z from "zod";

import CreateRes from "../helpers/createResponse.js";
import CheckUserIDExists from "../db/checkUserIdExists.js";
import AddScore from "../db/addPoints.js";
import getLeaderBoardDB from "../db/getLeaderBoard.js";
function createRandomPoints() {
  const min = 1;
  const max = 10;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const zSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export default function AddPoints(socket: Socket) {
  socket.on("add-points", async (data) => {
    const parsedData = zSchema.safeParse(data);
    if (!parsedData.success) {
      const response = CreateRes(false, "Invalid data", "User ID is required");
      socket.emit("add-points-response", response);
      return;
    }

    const { userId } = parsedData.data;
    // check if userId is valid
    if (!userId) {
      const response = CreateRes(false, "User ID is required");
      socket.emit("add-points-response", response);
      return;
    }

    try {
      const userExists = await CheckUserIDExists(userId);
      if (!userExists) {
        const response = CreateRes(false, "User ID does not exist");
        socket.emit("add-points-response", response);
        return;
      }

      // Generate random points
      const points = createRandomPoints();

      await AddScore(userId, points);

      const response = CreateRes(true, "Points added successfully");
      socket.emit("add-points-response", response);

      // send leaderboard update
      const leaderboard = await getLeaderBoardDB();

      const response2 = CreateRes(
        true,
        "Leaderboard fetched successfully",
        leaderboard
      );

      socket.broadcast.emit("leader-board-response", response2);
      socket.emit("leader-board-response", response2);
    } catch (error) {
      const response = CreateRes(false, "An error occurred", error);
      socket.emit("add-points-response", response);
    }
  });
}
