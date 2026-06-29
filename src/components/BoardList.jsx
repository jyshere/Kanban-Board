import "./BoardList.css";

export default function BoardList({
  boards,
  setSelectedBoardId,
  selectedBoardId,
  createBoard
}) {
  return (
    <div className="board-list-container">

      <h2 className="board-list-title">
        Boards
      </h2>

      <div className="board-items">
        {boards.map(board => (
          <button
            key={board.id}
            className={`board-item ${
              selectedBoardId === board.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              setSelectedBoardId(board.id)
            }
          >
            {board.title}
          </button>
        ))}
      </div>

      <button
        className="create-board-btn"
        onClick={() => {
          const title = prompt(
            "Enter board title",
            ""
          );

          if (!title || !title.trim())
            return;

          createBoard(title);
        }}
      >
        + New Board
      </button>

    </div>
  );
}