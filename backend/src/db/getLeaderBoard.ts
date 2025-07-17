import Score from "./modals/scorePoints.js";

export default async function getLeaderBoardDB() {
  try {
    const leaderboard = await Score.find({})
      .sort({ points: -1 })
      .limit(10)
      .populate("userRef", "name");


    return leaderboard;
  } catch (error) {
    console.error("Error fetching leaderboard from database:", error);
    throw error;
  }
}
