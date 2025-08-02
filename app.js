app.post("/submit", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("portfolioDB");
    const collection = database.collection("messages");

    await collection.insertOne({
      name,
      email,
      subject,
      message,
      time: new Date(),
    });

    res.send("✅ Message submitted successfully!");
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    res.status(500).send("Something went wrong!");
  } finally {
    await client.close();
  }
});
