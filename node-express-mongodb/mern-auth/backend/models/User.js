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
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: [6, "Password must be at least 6 characters long"],
            select: false,
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
