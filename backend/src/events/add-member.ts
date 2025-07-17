import { Socket } from "socket.io";
import z from "zod";

import mongoose from "../db/dbConnect.js";
import Member from "../db/modals/member.js";
import CreateRes from "../helpers/createResponse.js";
import Score from "../db/modals/scorePoints.js";

const addMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export default async function handleAddMember(socket: Socket) {
  const response = socket.on("add-member", async (data) => {
    // Add to DB, emit confirmations, etc.
    console.log("Add member data received:", data);
    if (!data) {
      CreateRes(false, "No data provided");
      return;
    }

    const parsedData = addMemberSchema.safeParse(data);
    if (!parsedData.success) {
      const errorMessage = "Name is not valid";
      socket.emit("add-member-response", CreateRes(false, errorMessage));
      return;
    }

    const { name } = parsedData.data;

    try {
      //  start transaction
      const session = await mongoose.startSession();
      session.startTransaction();
      const newMember = new Member({ name });
      await newMember.save();

      const newScore = new Score({
        userRef: newMember._id,
        points: 0,
      });
      await newScore.save();
      await session.commitTransaction();
      session.endSession();

      const response = CreateRes(true, "Member added successfully");

      socket.emit("add-member-response", response);
    } catch (error) {
      console.error("Error adding member:", error);
      const errorMessage = "Failed to add member";
      socket.emit("add-member-response", CreateRes(false, errorMessage));
    }
  });
}
