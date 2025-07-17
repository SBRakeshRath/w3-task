import { Button } from "@mui/material";
import "./addNewMemberModal.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext, useEffect, useRef, useState } from "react";
import { AddMemberPanelContext } from "../../context/addMemberPannelContext";
import socket from "../../socket/socketConfig";
import toast from "react-hot-toast";

export default function AddNewMemberModal() {
  const { isOpen, togglePanel } = useContext(AddMemberPanelContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("add-member-response", (data) => {
      setLoading(false);
      console.log("Response from server:", data);
      console.log(data.status);

      if (data.status === "success") {
        toast.success(data.message);
        if (inputRef.current) {
          inputRef.current.value = ""; // Clear the input field after successful addition
        }
      } else {
        toast.error(data.message || "Failed to add member");
      }
    });

    return () => {
      socket.off("add-member-response");
    };
  }, []);

  const handelFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions while loading
    const formData = new FormData(e.currentTarget);
    const name = formData.get("userName") as string;
    if (!name) {
      alert("Please enter a name");
      return;
    }
    // Emit the event to the server
    // socket.emit("add-member", { name });

    try {
      setLoading(true);
      socket.emit("add-member", { name });
      // Optionally, you can reset the form or close the modal after submission
      // e.currentTarget.reset();
      // togglePanel(); // Close the panel after adding a member
    } catch (error) {
      toast.error("Failed to add member. Please try again.");
      setLoading(false);
      console.error("Error adding member:", error);
    }

    // Logic to handle form submission
  };

  if (!isOpen) return null; // If the panel is not open, return null
  return (
    <div className="addNewMemberModalWrapper">
      <div className="modal">
        <div className="modalHead">
          <h1>Add New User</h1>
          <CancelIcon
            className="cancelIcon"
            onClick={togglePanel} // Use the togglePanel function from context
          />
        </div>

        <form onSubmit={handelFormSubmit}>
          <input
            type="text"
            placeholder="Enter a Name"
            name="userName"
            ref={inputRef}
          />
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
            {loading ? "Adding..." : "Add Member"}
          </Button>
        </form>
      </div>
    </div>
  );
}
