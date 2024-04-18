import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  const { invoiceId } = req.query;

  const client = await MongoClient.connect(
    `mongodb+srv://Siddharth@cluster0.dcu66ka.mongodb.net/Invoices_Db?retryWrites=true&w=majority`,
    
  );

  const db = client.db();
  const collection = db.collection("allInvoices");

  if (req.method === "PUT") {
    await collection.updateOne(
      { _id: new ObjectId(invoiceId) },
      {
        $set: {
          status: "paid",
        },
      }
    );

    res.status(200).json({ message: "Invoice paid" });
    client.close();
  }

  //   delete request
  if (req.method === "DELETE") {
    await collection.deleteOne({ _id: new ObjectId(invoiceId) });

    res.status(200).json({ message: "Invoice deleted successfully" });
    client.close();
  }
}

export default handler;
