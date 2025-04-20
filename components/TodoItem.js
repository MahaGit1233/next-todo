import { Card } from "react-bootstrap";

function TodoItem(props) {
  return (
    <li
      style={{
        listStyleType: "none",
        marginLeft: "30%",
        paddingBottom: "10px",
      }}
    >
      <Card style={{ width: "50%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "5px", paddingLeft: "15px" }}>
            <input
              type="radio"
              onChange={() => props.onComplete(props.id, props.task)}
            />
            <p style={{ paddingTop: "17px" }}>{props.task}</p>
          </div>
          <div style={{ paddingTop: "10px", paddingRight: "15px" }}>
            <button
              onClick={() => props.onDelete(props.id)}
              style={{
                border: "none",
                backgroundColor: "white",
                fontSize: "23px",
              }}
            >
              🗑
            </button>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default TodoItem;
