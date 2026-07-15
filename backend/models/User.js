const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const crypto   = require("crypto");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false,          // never returned by default
        },

        role: {
            type: String,
            enum: ["customer", "admin", "restaurantOwner"],
            default: "customer",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        // ---- Forgot Password ----
        passwordResetToken: {
            type: String,
            select: false,
        },

        passwordResetExpires: {
            type: Date,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

// ── Hash password before saving ──────────────────────────────────────────────
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ── Compare plain-text password with stored hash ──────────────────────────────
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// ── Generate & store a hashed reset token ────────────────────────────────────
userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store hashed version in DB
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    return resetToken; // return raw token (sent via email)
};

const User = mongoose.model("User", userSchema);

module.exports = User;