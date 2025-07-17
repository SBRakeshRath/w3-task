import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AddMemberPanelProvider } from "./context/addMemberPannelContext.tsx";
import { Toaster } from "react-hot-toast";
import { LeaderBoardProvider } from "./context/leaderBoardContext.tsx";
import { AddPointsPanelProvider } from "./context/addPointsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LeaderBoardProvider>
      <AddPointsPanelProvider>
        <AddMemberPanelProvider>
          <Toaster />
          <App />
        </AddMemberPanelProvider>
      </AddPointsPanelProvider>
    </LeaderBoardProvider>
  </StrictMode>
);
