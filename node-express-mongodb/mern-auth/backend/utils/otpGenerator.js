import crypto from "crypto";

export const generateOTP = () => {
    return String(crypto.randomInt(100000, 1000000));
};
