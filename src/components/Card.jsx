
export default function Card({ card, deleteCard, columnId, editCard }) {
  const handleDragStart = (e) => {

    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("sourceColumnId", columnId);

    e.currentTarget.style.opacity = "0.5";
  };
  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
  };
  return <div className="card" draggable
    onDragStart={handleDragStart}>
    {card.title}


    <button
      className="edit-btn"
      onClick={() => {
        const newTitle = prompt("Enter new title", card.title);

        if (!newTitle) return;

        editCard(columnId, card.id, newTitle);
      }}
    >
      ✎
    </button>

    <button
      className="delete-btn"
      onClick={() =>
        deleteCard(columnId, card.id)
      }
    >
      ✕
    </button>

  </div>;
}