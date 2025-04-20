import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://Mahathi:yPnoRuFUxj0yKojI@cluster0.hmlhj5s.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");

  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    const result = await todosCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Todo inserted!" });
  } else if (req.method === "DELETE") {
    const id = req.query;

    const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
    console.log(result);
    client.close();
    res.status(201).json({ message: "Todo deleted!" });
  } else if (req.method === "PUT") {
    const id = req.query;
    const data = req.body;
    const result = await todosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: data.status } }
    );
    client.close();
    res.status(200).json({ message: "Todo updated!" });
  }
}

export default handler;
