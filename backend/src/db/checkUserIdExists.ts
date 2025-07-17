import Member from "./modals/member.js";
export default async function CheckUserIDExists(userId: String) {
  try {
    const user = await Member.findById(userId).select("_id");
    return !!user; // Returns true if user exists, false otherwise
  } catch (error) {
    console.error("Error checking if user ID exists:", error);
    throw error;
  }
}
