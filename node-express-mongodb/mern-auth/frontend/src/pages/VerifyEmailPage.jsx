import { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
axios.defaults.withCredentials = true;

const VerifyEmailPage = () => {
    const { backendUrl, getUserData, isLoggedIn, userData } = useContext(AppContext);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
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
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const otpArray = inputRefs.current.map((e) => e.value);
            const otp = otpArray.join("");
            const { data } = await axios.post(backendUrl + "/api/v1/auth/verify-account", { OTP: otp });
            if (data.success) {
                toast.success(data.message);
                getUserData();
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Verification failed");
        }
    };

    useEffect(() => {
        isLoggedIn && userData && userData.isAccountVerified && navigate("/");
    }, [isLoggedIn, userData]);
    return (
        <div className="flex items-center justify-center min-h-screen sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
            <img
                src={assets.logo}
                className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
                onClick={() => navigate("/")}
            />
            <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm" onSubmit={onSubmitHandler}>
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verify OTP</h1>
                <p className="text-center mb-6 text-indigo-300">Enter the 6-digit OTP sent to your registered email</p>
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
                <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
                    Verify email
                </button>
            </form>
        </div>
    );
};

export default VerifyEmailPage;
