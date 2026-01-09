import transporter from "../services/emailService.js";

export const sendEmail = async (to, subject, html, errorContext = "Email") => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(`${errorContext} failed to ${to}:`, error.message);
    }
};
