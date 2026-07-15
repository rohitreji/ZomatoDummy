const cors       = require("cors");
const express    = require("express");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ── Global Middleware ──────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/auth",  authRoutes);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.send("Hello welcome to zomato backend");
});

module.exports = app;
