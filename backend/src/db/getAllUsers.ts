import Member from "./modals/member.js";

const getAllUsersDB = async () => {
  try {
    const users = await Member.find({}).select("name _id");
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

export default getAllUsersDB;
