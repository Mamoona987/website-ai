// This file handles everything related to the contact form:
// - saving a new message  (POST /api/contact)
// - viewing all messages  (GET  /api/contact)  -- useful for testing

const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// ---------------------------------------------------------
// POST /api/contact
// Called when someone submits the contact form on the website
// ---------------------------------------------------------
router.post("/", async function (req, res) {
  try {
    const { name, email, message } = req.body;

    // Basic server-side validation (never trust the browser alone)
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: "Name is required." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      return res.status(400).json({ success: false, error: "A valid email is required." });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, error: "Message must be at least 10 characters." });
    }

    // Save the message to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message saved successfully!" });

  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ success: false, error: "Something went wrong on the server." });
  }
});

// ---------------------------------------------------------
// GET /api/contact
// Lets you check saved messages in the browser at:
// http://localhost:5000/api/contact
// ---------------------------------------------------------
router.get("/", async function (req, res) {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: "Could not fetch messages." });
  }
});

module.exports = router;
