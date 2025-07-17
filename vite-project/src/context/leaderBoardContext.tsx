// leaderBoardContext.tsx

import React, { createContext, useState } from "react";
type LeaderboardEntry = {
  _id: string;
  userRef: {
    _id: string;
    name: string;
  };
  points: number;
  __v: number;
};

type Leaderboard = LeaderboardEntry[];

interface LeaderBoardContextType {
  leaderboard: Leaderboard;
  setLeaderboard: (newData: Leaderboard) => void;
}

const LeaderBoardContext = createContext<LeaderBoardContextType>({
  leaderboard: [],

  setLeaderboard: (newData: Leaderboard) => void {},
});

const LeaderBoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [leaderboard, updateLeaderboard] = useState<Leaderboard>([]);

  const setLeaderboard = (newData: Leaderboard) => {
    if (JSON.stringify(leaderboard) !== JSON.stringify(newData)) {
      updateLeaderboard(newData);
    }
  };

  return (
    <LeaderBoardContext.Provider value={{ leaderboard, setLeaderboard }}>
      {children}
    </LeaderBoardContext.Provider>
  );
};

export { LeaderBoardContext, LeaderBoardProvider };
