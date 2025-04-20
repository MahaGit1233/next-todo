import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { MongoClient } from "mongodb";
import Link from "next/link";
import { useState } from "react";
import { Button } from "react-bootstrap";

function HomePage(props) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [todos, setTodos] = useState(props.todos || []);
  const [completedTodos, setCompletedTodos] = useState([]);

  const closeHandler = () => {
    setShowTaskForm(false);
  };

  const showTaskHandler = () => {
    setShowTaskForm(true);
  };

  async function addTodosHandler(todo) {
    const response = await fetch("/api/", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setTodos((prevTodos) => [...prevTodos, { id: data._id, task: todo.task }]);
  }

  async function deleteTodosHandler(id) {
    const response = await fetch(`/api/?id=${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  const completeTodoHandler = async (id, task) => {
    const response = await fetch(`/api/?id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "completed" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    setCompletedTodos((prevCompletedTodos) => [
      ...prevCompletedTodos,
      { id, task },
    ]);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "2%" }}>
      <h1>Todo's</h1>
      <TodoList
        todos={todos}
        onDelete={deleteTodosHandler}
        onComplete={completeTodoHandler}
      />
      <Link href="/completed">
        <Button variant="outline-success" style={{ margin: "10px" }}>
          View Completed Tasks
        </Button>
      </Link>
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

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Mahathi:yPnoRuFUxj0yKojI@cluster0.hmlhj5s.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");
  const todos = await todosCollection.find({ status: "Incomplete" }).toArray();
  client.close();
  return {
    props: {
      todos: todos.map((todo) => ({
        id: todo._id.toString(),
        task: todo.task,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
