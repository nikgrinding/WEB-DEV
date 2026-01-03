import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email id is required."],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        verifyOTP: {
            type: String,
            default: "",
        },
        verifyOTPExpireTime: {
            type: Number,
            default: 0,
        },
        isAccountVerified: {
            type: Boolean,
            default: false,
        },
        resetOTP: {
            type: String,
            default: "",
        },
        resetOTPExpireTime: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
