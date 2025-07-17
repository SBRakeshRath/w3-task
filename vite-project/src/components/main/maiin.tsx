import { useContext, useEffect } from "react";
import "./main.scss";
import socket from "../../socket/socketConfig";
import toast from "react-hot-toast";
import { LeaderBoardContext } from "../../context/leaderBoardContext";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type LeaderBoardItem = {
  userRef: {
    name: string;
  };
  points: number;
};

const columnHelper = createColumnHelper<LeaderBoardItem>();

const columns = [
  // ranking column
  columnHelper.accessor((_, index) => index + 1, {
    id: "rank",
    header: "Rank",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("userRef.name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("points", {
    header: "Score",
    cell: (info) => info.getValue(),
  }),

];
export default function MainComponent() {
  const { leaderboard, setLeaderboard } = useContext(LeaderBoardContext);
  useEffect(() => {
    try {
      socket.emit("get-leader-board");
    } catch (error) {
      toast.error("Failed to fetch leader board data. Please try again.");
      console.error("Error fetching leader board data:", error);
    }
  });

  useEffect(() => {
    socket.on("leader-board-response", async (data) => {
      console.log("Leader Board Data:", data);
      if (data.status === "success") {
        setLeaderboard(data.data);
      }

      if (data.status !== "success") {
        toast.error(data.message);
      }
    });
    return () => {
      socket.off("leader-board-response");
    };
  }, [leaderboard]);

  // leaderboard rendering logic

  const table = useReactTable({
    data: leaderboard,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main>
      <div className="mainHeading">
        <h1>Leader Board</h1>
      </div>
      <div className="leaderBoardWrapper">
        <div className="leaderBoard">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
