import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const Score = mongoose.model("Score", scoreSchema);

export default Score;
