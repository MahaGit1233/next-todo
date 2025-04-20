import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

function TodoForm(props) {
  const [enteredTask, setEnteredTask] = useState("");

  const taskHandler = (event) => {
    setEnteredTask(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const tasks = { task: enteredTask, status: "incomplete" };

    props.onAddTodo(tasks);

    setEnteredTask("");
    props.onClose();
  };

  return (
    <Card
      style={{
        width: "40%",
        marginLeft: "30%",
        backgroundColor: "whitesmoke",
        border: "none",
      }}
    >
      <Form style={{ width: "95%" }} onSubmit={formSubmitHandler}>
        <Form.Group style={{ marginTop: "5%", marginLeft: "5%" }}>
          <Form.Label>Add your task:</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your task"
            value={enteredTask}
            onChange={taskHandler}
          />
        </Form.Group>
        <div
          style={{
            padding: "2%",
            display: "flex",
            justifyContent: "end",
            gap: "3%",
          }}
        >
          <Button variant="outline-secondary" onClick={props.onClose}>
            Close
          </Button>
          <Button variant="outline-danger" type="submit">
            Add Task
          </Button>
        </div>
      </Form>
    </Card>
  );
}

export default TodoForm;
