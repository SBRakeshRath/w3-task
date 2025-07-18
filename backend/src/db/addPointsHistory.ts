import pointHistory from "./modals/addPointHistory.js";

export default async function addPointHistory(point: number, userId: string) {
  try {
    const newPointHistory = new pointHistory({
      point: point,
      memberId: userId,
    });

    await newPointHistory.save();
    return true;
  } catch (error) {
    console.error("Error adding point history:", error);
    return false;
  }
}
