const { default: TodoItem } = require("./TodoItem");

function TodoList(props) {
  return (
    <ul>
      {props.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          task={todo.task}
          onDelete={props.onDelete}
          onComplete={props.onComplete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
