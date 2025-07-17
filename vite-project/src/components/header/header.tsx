import { AddMemberPanelContext } from "../../context/addMemberPannelContext";
import { AddPointsPanelContext } from "../../context/addPointsContext";

import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import "./header.scss";
import { useContext } from "react";

export default function Header() {
  const { togglePanel } = useContext(AddMemberPanelContext);
  const addPointsContext = useContext(AddPointsPanelContext);


  return (
    <header>
      <h1>3W Task</h1>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={togglePanel} // Use the togglePanel function from context
        className="addMemberButton"
      >
        Member
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={addPointsContext.togglePanel} // Use the togglePanel function from context
        className="addMemberButton"
      >
        Points
      </Button>
    </header>
  );
}
