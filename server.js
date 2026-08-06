// =======================================================
// NOOR AI — BACKEND SERVER
// =======================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 5000;

// =======================================================
// MONGODB CONNECTION
// =======================================================

const MONGODB_URI =
  "mongodb+srv://Mamona:Mamona12345@cluster0.6fkfv8l.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";

// =======================================================
// MIDDLEWARE
// =======================================================

app.use(cors());
app.use(express.json());

// =======================================================
// SERVE FRONTEND FILES
// public folder backend ke bahar hai
// =======================================================

app.use(express.static(path.join(__dirname, "..", "public")));

// =======================================================
// HOME ROUTE
// =======================================================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// =======================================================
// CONTACT API
// =======================================================

app.use("/api/contact", contactRoutes);

// =======================================================
// OPTIONAL TEST API
// =======================================================

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running successfully 🚀",
  });
});

// =======================================================
// START SERVER
// =======================================================

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
  });