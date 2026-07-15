const crypto        = require("crypto");
const User          = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail     = require("../utils/sendEmail");

// ── POST /api/auth/register ───────────────────────────────────────────────────
/**
 * @desc    Register a new user
 * @access  Public
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check for duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        const user = await User.create({ name, email, password, role });

        // Generate JWT so user is logged in immediately after registering
        const token = generateToken({ id: user._id, role: user.role });

        // password is select:false — will not appear in the response document
        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            token,
            user,
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error,
        });
    }
};

// ── POST /api/auth/login ──────────────────────────────────────────────────────
/**
 * @desc    Login user — returns JWT on success
 * @access  Public
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Explicitly select password (select:false in schema)
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // Block deactivated accounts before checking password
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated. Please contact support.",
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const token = generateToken({ id: user._id, role: user.role });

        // Strip password before sending
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error,
        });
    }
};

// ── POST /api/auth/logout ─────────────────────────────────────────────────────
/**
 * @desc    Logout — JWT is stateless; client must delete the token
 * @access  Private
 */
const logoutUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logged out successfully. Please delete your token on the client.",
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error,
        });
    }
};

// ── PUT /api/auth/change-password ─────────────────────────────────────────────
/**
 * @desc    Change the logged-in user's password
 * @access  Private
 */
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Fetch user with password field
        const user = await User.findById(req.user._id).select("+password");

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect.",
            });
        }

        // Assign new password — pre-save hook hashes it automatically
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully.",
        });
    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error,
        });
    }
};

// ── POST /api/auth/forgot-password ───────────────────────────────────────────
/**
 * @desc    Generate a reset token and email it to the user
 * @access  Public
 */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            // Always return 200 — prevents email-enumeration attacks
            return res.status(200).json({
                success: true,
                message: "If this email is registered, a reset link has been sent.",
            });
        }

        const resetToken = user.generatePasswordResetToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2 style="color: #e23744;">Zomato Clone — Password Reset</h2>
                <p>Hi <strong>${user.name}</strong>,</p>
                <p>You requested a password reset. Click the button below:</p>
                <a href="${resetUrl}"
                   style="display:inline-block;padding:12px 24px;background:#e23744;color:#fff;
                          text-decoration:none;border-radius:4px;font-size:16px;">
                    Reset Password
                </a>
                <p style="margin-top:20px;color:#888;">
                    This link expires in <strong>10 minutes</strong>.
                </p>
                <p>If you did not request this, please ignore this email.</p>
            </div>
        `;

        try {
            await sendEmail({
                to:      user.email,
                subject: "Zomato Clone — Password Reset Request",
                html:    htmlBody,
            });

            res.status(200).json({
                success: true,
                message: "Password reset email sent successfully.",
            });
        } catch (emailError) {
            // Roll back token if email delivery fails
            user.passwordResetToken   = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });

            console.error("Email send error:", emailError);
            return res.status(500).json({
                success: false,
                message: "Email could not be sent. Please try again later.",
            });
        }
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error,
        });
    }
};

// ── PUT /api/auth/reset-password/:token ──────────────────────────────────────
/**
 * @desc    Reset password using the token received in email
 * @access  Public
 */
const resetPassword = async (req, res) => {
    try {
        const { token }       = req.params;
        const { newPassword } = req.body;

        // Hash the raw token to compare against the stored hash in DB
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            passwordResetToken:   hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        }).select("+passwordResetToken +passwordResetExpires");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired password reset token.",
            });
        }

        user.password             = newPassword;
        user.passwordResetToken   = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // Issue a fresh JWT so the user is logged in immediately after reset
        const jwtToken = generateToken({ id: user._id, role: user.role });

        res.status(200).json({
            success: true,
            message: "Password reset successful.",
            token:   jwtToken,
        });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
