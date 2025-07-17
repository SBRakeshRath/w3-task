import Score from "./modals/scorePoints.js";

export default async function AddScore(userId: String, points: number) {
  try {
    //  get Current Score
    const currentScore = await Score.findOne({ userRef: userId });
    if (currentScore) {
      // If score exists, update it
      currentScore.points += points;
      await currentScore.save();
    } else {
      // If score does not exist, create a new one
      const newScore = new Score({
        userRef: userId,
        points: points,
      });
      await newScore.save();
    }
  } catch (error) {
    console.error("Error adding score to user:", error);
    throw error;
  }
}
