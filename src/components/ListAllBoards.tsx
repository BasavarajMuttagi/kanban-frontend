import { useEffect, useState } from "react";
import apiClient from "../axios/apiClient";
import { Board } from "../types";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import BoardForm from "./BoardForm";

const ListAllBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [show, setShow] = useState(false);
  const getTaskById = async () => {
    const result = await apiClient.get("/board/list");
    return result;
  };
  useEffect(() => {
    getTaskById().then((res) => setBoards(res.data));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="space-y-5 mt-5 p-2">
      <button
        onClick={() => setShow(true)}
        className="font-medium px-5 py-1.5 rounded-md text-white bg-blue-500"
      >
        Create New Board
      </button>
      {boards.map((eachBoard) => (
        <div
          onClick={() => navigate(`/board/${eachBoard.boardId}`)}
          key={eachBoard.boardId}
          className="w-full rounded-md shadow neutral-blue-100 p-5 text-xl font-bold cursor-pointer border"
        >
          {eachBoard.name}
        </div>
      ))}

      {show &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 p-3">
            <BoardForm closeDialog={setShow} />
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ListAllBoards;
