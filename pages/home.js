import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";

const dummy_todo = [
  { id: 1, task: "first todo task" },
  { id: 2, task: "second todo task" },
];

function HomePage() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const closeHandler = () => {
    setShowTaskForm(false);
  };

  const showTaskHandler = () => {
    setShowTaskForm(true);
  };

  async function addTodosHandler(todo) {
    const response = await fetch("/", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div style={{ textAlign: "center", paddingTop: "2%" }}>
      <h1>Todo's</h1>
      <TodoList todos={dummy_todo} />
      {!showTaskForm ? (
        <Button variant="outline-primary" onClick={showTaskHandler}>
          Add Tasks
        </Button>
      ) : (
        <TodoForm onClose={closeHandler} onAddTodo={addTodosHandler} />
      )}
    </div>
  );
}

export default HomePage;
