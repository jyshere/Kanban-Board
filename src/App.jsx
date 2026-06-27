import "./App.css";
import { useState, useEffect } from "react";
import initialBoard from "./data/initialBoard";
import Board from "./components/Board";

export default function App() {
  const [board, setBoard] = useState(initialBoard);

  const addCard = (ColumnId, title) => {
    const newCard = {
      id: Date.now().toString(),
      title
    };


    const newBoard = {
      ...board,
      columns: board.columns.map((col) =>
        col.id === ColumnId ?
          { ...col, cards: [...col.cards, newCard] }
          : col
      )
    }


    setBoard(newBoard);
  }

  const deleteCard = (columnId, cardId) => {
    const updatedBoard = {
      ...board,
      columns: board.columns.map((col) =>
        col.id === columnId
          ? {
            ...col,
            cards: col.cards.filter(
              (card) => card.id !== cardId
            )
          }
          : col
      )
    };

    setBoard(updatedBoard);
  };


  const editCard = (columnId, cardId, newTitle) => {
    const editedBoard = {
      ...board,
      columns: board.columns.map((col) => col.id === columnId ?
        {
          ...col,
          cards: col.cards.map((card) => card.id === cardId ?
            {
              ...card,
              title: newTitle
            }
            :
            card
          )

        } :
        col

      )
    }
    setBoard(editedBoard);
  };



 const moveCard = (cardId, sourceColumnId, destinationColumnId) => {

  const sourceColumn = board.columns.find(
    col => col.id === sourceColumnId
  );

   const cardToMove = sourceColumn.cards.find(
    card => card.id === cardId
  );

  if (!sourceColumn || !cardToMove) {
   
    return;
  }

  const updatedColumns = board.columns.map(col => {
    if (col.id === sourceColumnId) {
      return {
        ...col,
        cards: col.cards.filter(card => card.id !== cardId)
      };
    }

    if (col.id === destinationColumnId) {
      return {
        ...col,
        cards: [...col.cards, cardToMove]
      };
    }

    return col;
  });

  setBoard({
    ...board,
    columns: updatedColumns
  });
};


  return (
    <div className="app">
      <h1 className="app-title">{board.title}</h1>
      <Board board={board} addCard={addCard} deleteCard={deleteCard} editCard={editCard} moveCard={moveCard}/>

    </div>
  );
}