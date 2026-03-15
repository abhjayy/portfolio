const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

/* DATABASE CONNECTION */

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // your MySQL password
    database: "portfolio"
});

db.connect((err) => {
    if (err) {
        console.log("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database");
    }
});

/* TEST ROUTE */

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

/* CONTACT ROUTE */

app.post("/contact", (req, res) => {

    console.log("📨 Incoming form data:", req.body);

    const { name, email, message } = req.body;

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {

        if (err) {
            console.log("❌ MYSQL ERROR:", err);
            return res.status(500).json({ message: "Database error" });
        }

        console.log("✅ Data inserted successfully");

        res.json({ message: "Message saved successfully" });

    });

});

/* SERVER */

app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});