import Card from "./Card";
import { useState } from "react";

export default function Column({ column, addCard, deleteCard, editCard,moveCard }) {
  const [text, setText] = useState("");


  const handleAdd = () => {
    if (!text.trim()) return;

    addCard(column.id, text);
    setText("");
  };

  const handleDrop = (e) => {
    console.log("DROP HAPPENED");
    const cardId = e.dataTransfer.getData("cardId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");
    console.log("DROP DATA:", {
      cardId,
      sourceColumnId,
      destinationColumnId: column.id
    });

    moveCard(cardId, sourceColumnId, column.id);
  };


  const handleDragOver = (e) => {

    e.preventDefault(); // IMPORTANT or drop won't work
    console.log("DRAG OVER COLUMN:", column.id);
  };

  return (
    <div className="column" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="column-title">{column.title}</div>

      {column.cards?.map((card) => (

        <Card key={card.id}
        card={card} 
        deleteCard={deleteCard} 
        columnId={column.id}
         editCard={editCard} />
      ))}

      <div className="column-input-area">
        <input
          className="column-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New Card..."
        />

        <button className="column-button" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}