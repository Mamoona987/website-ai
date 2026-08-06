// This file defines the "shape" of every contact-form message
// we save in MongoDB. Think of it like a table structure.

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // automatically stores the date/time it was submitted
  },
});

// "Contact" here becomes a MongoDB collection called "contacts"
module.exports = mongoose.model("Contact", contactSchema);
