const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('your_connection_string_here')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Mongoose schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// Route for form submission
app.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.send('Message received successfully!');
  } catch (error) {
    console.error("❌ Error saving to DB:", error);
    res.status(500).send('Error saving message.');
  }
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));


const { body, validationResult } = require('express-validator');
