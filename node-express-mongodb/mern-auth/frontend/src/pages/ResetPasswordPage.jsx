import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const ResetPasswordPage = () => {
    const { backendUrl } = useContext(AppContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const inputRefs = useRef([]);
    const handleInput = (e, idx) => {
        if (e.target.value.length > 0 && idx < inputRefs.current.length - 1) {
            inputRefs.current[idx + 1].focus();
        }
    };
    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && e.target.value === "" && idx > 0) {
            inputRefs.current[idx - 1].focus();
        }
    };
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text");
        const pasteArray = paste.split("");
        pasteArray.forEach((char, idx) => {
            if (inputRefs.current[idx]) {
                inputRefs.current[idx].value = char;
            }
        });
    };

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + "/api/v1/auth/send-reset-otp", { email });
            if (data.success) {
                toast.success(data.message);
                setIsEmailSent(true);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Password reset failed");
        }
    };

    const onSubmitOtp = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map((e) => e.value);
        setOtp(otpArray.join(""));
        setIsOtpSubmitted(true);
    };

    const onSubmitPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + "/api/v1/auth/reset-password", {
                email,
                OTP: otp,
                newPassword: password,
            });
            if (data.success) {
                toast.success(data.message);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Password reset failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
            <img
                src={assets.logo}
                className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
                onClick={() => navigate("/")}
            />

            {!isEmailSent && (
                <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm" onSubmit={onSubmitEmail}>
                    <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
                    <p className="text-center mb-6 text-indigo-300">Enter your registered email</p>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white">
                        <img src={assets.mail_icon} className="w-3 h-3" />
                        <input
                            type="email"
                            placeholder="Email id"
                            className="bg-transparent outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">
                        Submit
                    </button>
                </form>
            )}

            {!isOtpSubmitted && isEmailSent && (
                <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm" onSubmit={onSubmitOtp}>
                    <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password OTP</h1>
                    <p className="text-center mb-6 text-indigo-300">
                        Enter the 6-digit OTP sent to your registered email
                    </p>
                    <div className="flex justify-between mb-8" onPaste={handlePaste}>
                        {Array(6)
                            .fill(0)
                            .map((_, idx) => {
                                return (
                                    <input
                                        type="text"
                                        maxLength="1"
                                        key={idx}
                                        required
                                        className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                                        ref={(e) => (inputRefs.current[idx] = e)}
                                        onInput={(e) => {
                                            handleInput(e, idx);
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, idx)}
                                    />
                                );
                            })}
                    </div>
                    <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
                        Submit
                    </button>
                </form>
            )}
            {isOtpSubmitted && isEmailSent && (
                <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm" onSubmit={onSubmitPassword}>
                    <h1 className="text-white text-2xl font-semibold text-center mb-4">New Password</h1>
                    <p className="text-center mb-6 text-indigo-300">Enter the new password below</p>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] text-white">
                        <img src={assets.lock_icon} className="w-3 h-3" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-transparent outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default ResetPasswordPage;
