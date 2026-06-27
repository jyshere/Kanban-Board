import Column from "./Column";

export default function Board({ board ,addCard, deleteCard,editCard,moveCard}) {
  return (
    <div className="board">
      {board.columns.map((column) => (
        <Column 
        key={column.id} 
        column={column} 
        addCard={addCard} 
        deleteCard={deleteCard} 
        editCard={editCard}
        moveCard={moveCard}/>
      ))}
    </div>
  );
}