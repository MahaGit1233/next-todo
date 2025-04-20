import { MongoClient } from "mongodb";
import { Card } from "react-bootstrap";

function CompletedPage({ completedTodos }) {
  return (
    <div style={{ textAlign: "center", paddingTop: "2%" }}>
      <h1>Completed Tasks</h1>
      <ul>
        {completedTodos.map((todo) => (
          <li
            style={{
              listStyleType: "none",
              marginLeft: "30%",
              paddingBottom: "10px",
            }}
          >
            <Card style={{ width: "50%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{ display: "flex", gap: "5px", paddingLeft: "15px" }}
                >
                  <p style={{ paddingTop: "17px" }}>{todo.task}</p>
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
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Mahathi:yPnoRuFUxj0yKojI@cluster0.hmlhj5s.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");

  const completedTodos = await todosCollection
    .find({ status: "completed" })
    .toArray();

  client.close();

  return {
    props: {
      completedTodos: completedTodos.map((todo) => ({
        id: todo._id.toString(),
        task: todo.task,
      })),
    },
    revalidate: 1,
  };
}

export default CompletedPage;
