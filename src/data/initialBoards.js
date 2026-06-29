const initialBoards = [{
  id: `board-${Date.now()}`,
  title: "My Kanban Board",
  columns: [
    {
      id: "col-1",
      title: "To Do",
      cards: [
        { id: "c1", title: "Learn React" }
      ]
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
}];

export default initialBoards;