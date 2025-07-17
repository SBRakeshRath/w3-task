import { Button } from "@mui/material";
import "./addPointsModal.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext, useEffect, useRef, useState } from "react";
import { AddPointsPanelContext } from "../../context/addPointsContext";
import socket from "../../socket/socketConfig";
import toast from "react-hot-toast";

export default function AddPointsModal() {
  const { isOpen, togglePanel } = useContext(AddPointsPanelContext);
  const inputRef = useRef<HTMLSelectElement>(null);
  const [loading, setLoading] = useState(false);

  type User = { _id: string; name: string };
  const [usersList, setUsersList] = useState<User[]>([]);

  const handelFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions while loading
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName") as string;
    if (!userName) {
      toast.error("Please select a user");
      return;
    }
    console.log("Selected User ID:", userName);

    try {
      setLoading(true); // Set loading state to true
      socket.emit("add-points", { userId: userName });
    } catch (error) {
      console.error("Error adding points:", error);
      toast.error("Failed to add points. Please try again.");
    }
  };

  useEffect(() => {
    socket.emit("get-users-list");
  }, []);

  useEffect(() => {
    socket.on("users-list-response", (data) => {
      if (data.status === "success") {
        setUsersList(data.data);
      } else {
        toast.error(data.message || "Failed to fetch users list");
      }
    });

    return () => {
      socket.off("users-list-response");
    };
  }, []);

  useEffect(() => {
    socket.on("add-points-response", (data) => {
      if (data.status === "success") {
        toast.success("Points added successfully");
        togglePanel(); // Close the panel after successful addition
      } else {
        toast.error(data.message || "Failed to add points");
      }
      setLoading(false); // Reset loading state
    });

    return () => {
      socket.off("add-points-response");
    };
  }),
    [];

  console.log("Users List:", usersList);

  if (!isOpen) return null; // If the panel is not open, return null
  return (
    <div className="addPointsPanelWrapper">
      <div className="modal">
        <div className="modalHead">
          <h1>Add Points</h1>
          <CancelIcon
            className="cancelIcon"
            onClick={togglePanel} // Use the togglePanel function from context
          />
        </div>

        <form onSubmit={handelFormSubmit}>
          <select name="userName" ref={inputRef}>
            <option value="">Select a User</option>
            {usersList.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          {/* <input type="submit" value="Add" /> */}
          <Button
            variant="contained"
            color="success"
            type="submit"
            className="addButton"
            // disabled={loading} // Disable the button while loading
            startIcon={loading ? <span className="loader"></span> : null} //
            // disable button text while loading
          >
            {loading ? "Adding..." : "Add Points"}
          </Button>
        </form>
      </div>
    </div>
  );
}
