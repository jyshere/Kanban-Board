import "./App.css";
import { useState } from "react";
import initialBoards from "./data/initialBoards";
import Board from "./components/Board";
import BoardList from "./components/BoardList";

export default function App() {
  const [boards, setBoards] = useState(initialBoards);
  const [selectedBoardId, setSelectedBoardId] = useState(null)

  const currentBoard = boards.find((b) => (b.id === selectedBoardId));

  const createBoard = (title) => {
    const newBoard = {
      id: `board-${Date.now()}`,
      title,
      columns: [
        {
          id: "col-1",
          title: "To Do",
          cards: []
        },
        {
          id: "col-2",
          title: "In-progress",
          cards: []
        },
        {
          id: "col-3",
          title: "Done",
          cards: []
        }

      ]
    };

    setBoards([...boards,newBoard]);
    setSelectedBoardId(newBoard.id);


  }

  const addCard = (columnId, title) => {
    const newCard = {
      id: Date.now().toString(),
      title
    };

    const updatedBoards = boards.map(board => {
      if (board.id !== selectedBoardId) return board;

      return {
        ...board,
        columns: board.columns.map(col =>
          col.id === columnId
            ? { ...col, cards: [...col.cards, newCard] }
            : col
        )
      };
    });

    setBoards(updatedBoards);
  };

  const deleteCard = (columnId, cardId) => {
    const updatedBoards = boards.map(board => {
      if (board.id !== selectedBoardId) return board;

      return {
        ...board,
        columns: board.columns.map(col =>
          col.id === columnId
            ? {
              ...col,
              cards: col.cards.filter(
                card => card.id !== cardId
              )
            }
            : col
        )
      };
    });

    setBoards(updatedBoards);
  };


  const editCard = (columnId, cardId, newTitle) => {
    const updatedBoards = boards.map(board => {
      if (board.id !== selectedBoardId) return board;

      return {
        ...board,
        columns: board.columns.map(col =>
          col.id === columnId
            ? {
              ...col,
              cards: col.cards.map(card =>
                card.id === cardId
                  ? {
                    ...card,
                    title: newTitle
                  }
                  : card
              )
            }
            : col
        )
      };
    });

    setBoards(updatedBoards);
  };





  const moveCard = (cardId, sourceColumnId, destinationColumnId) => {
    const sourceColumn = currentBoard.columns.find(
      col => col.id === sourceColumnId
    );

    if (!sourceColumn) return;

    const cardToMove = sourceColumn.cards.find(
      card => card.id === cardId
    );

    if (!cardToMove) return;

    const updatedBoards = boards.map(board => {
      if (board.id !== selectedBoardId) return board;

      return {
        ...board,
        columns: board.columns.map(col => {
          if (col.id === sourceColumnId) {
            return {
              ...col,
              cards: col.cards.filter(
                card => card.id !== cardId
              )
            };
          }

          if (col.id === destinationColumnId) {
            return {
              ...col,
              cards: [...col.cards, cardToMove]
            };
          }

          return col;
        })
      };
    });

    setBoards(updatedBoards);
  };


  return (
    <div className="app">

  <div className="sidebar">
    <h2>Boards</h2>

    <BoardList
      boards={boards}
      selectedBoardId={selectedBoardId}
      setSelectedBoardId={setSelectedBoardId}
      createBoard={createBoard}
    />
  </div>

  <div className="main-content">

    {currentBoard && (
      <>
        <h1>{currentBoard.title}</h1>

        <Board
          board={currentBoard}
          addCard={addCard}
          deleteCard={deleteCard}
          editCard={editCard}
          moveCard={moveCard}
        />
      </>
    )}

  </div>

</div>
  );
}
