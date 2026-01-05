import transporter from "../services/emailService.js";

export const sendEmail = async (to, subject, text, errorContext = "Email") => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(`${errorContext} failed to ${to}:`, error.message);
    }
};
