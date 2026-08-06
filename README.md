# Noor AI — Backend Setup Guide (No .env file)

Your folder is already organized correctly. Here's exactly what to do.

---

## Step 1 — Install Node.js (skip if already installed)

Go to https://nodejs.org, download the **LTS** version, install it.
Check it worked by opening a terminal and typing:
```
node -v
npm -v
```

---

## Step 2 — Add your MongoDB connection string

1. Open `backend/server.js` in any text editor (Notepad, VS Code, etc.)
2. Find this line near the top:
   ```js
   const MONGODB_URI = "PASTE_YOUR_MONGODB_CONNECTION_STRING_HERE";
   ```
3. Replace the text between the quotes with your real MongoDB Atlas connection string, for example:
   ```js
    const MONGODB_URI = "mongodb+srv://Mamona:Mamona12345@cluster0.6fkfv8l.mongodb.net/mydatabase?retryWrites=true&w=majority";

4. Save the file.

⚠️ **Important:** since your password now lives directly inside `server.js`, do **not**
upload this file to a public GitHub repository — anyone could see your database password.
If you ever do want to put this project on GitHub, tell me and I'll show you the safe way.

---

## Step 3 — Install dependencies

Open a terminal **inside the `backend` folder** and run:
```
npm install
```

---

## Step 4 — Start the server

Still inside `backend`, run:
```
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running at http://localhost:5000
```

If instead you see:
```
❌ You haven't added your MongoDB connection string yet.
```
go back to Step 2 — you missed replacing the placeholder text.

---

## Step 5 — Test it

1. Open **http://localhost:5000** in your browser — this loads your website
   (the `public` folder is served automatically).
2. Fill out the Contact form and click **Send Message**.
3. Confirm it saved by visiting **http://localhost:5000/api/contact** —
   you should see your message as JSON.
4. Or check visually in MongoDB Atlas → your cluster → **Browse Collections** →
   `noorai` database → `contacts` collection.

---

## Quick Troubleshooting

| Problem | Fix |
|---|---|
| `❌ MongoDB connection failed` | Your connection string or password is wrong — recheck Step 2 |
| `❌ You haven't added your MongoDB connection string yet` | You didn't replace the placeholder text in `server.js` |
| `Cannot find module 'express'` | Run `npm install` inside the `backend` folder |
| Form says "could not reach the server" | The server isn't running — run `npm start` in `backend` |
