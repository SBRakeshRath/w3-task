import { Socket } from "socket.io";
import CreateRes from "../helpers/createResponse.js";
import getAllUsersDB from "../db/getAllUsers.js";

export default function GetUserList(Socket: Socket) {
  Socket.on("get-users-list", async () => {
    try {
      const users = await getAllUsersDB();

      const response = CreateRes(
        true,
        "Users list fetched successfully",
        users
      );

      Socket.emit("users-list-response", response);
    } catch (error) {
      console.error("Error fetching users list:", error);
      const response = CreateRes(false, "Failed to fetch users list");
      Socket.emit("users-list-response", response);
    }
  });
}
