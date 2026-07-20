const cors = require("cors");
const express = require("express");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes")
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const addressRoutes = require("./routes/addressRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const coupenRoutes = require("./routes/coupenRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require('./routes/categoryRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const offerRoutes = require('./routes/offerRoutes');





const app = express();

// ── Global Middleware ──────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());


// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/coupen", coupenRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/offers', offerRoutes);


// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.send("Hello welcome to zomato backend");
});

module.exports = app;
