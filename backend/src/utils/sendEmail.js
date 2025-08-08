// utils/sendEmail.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendResetEmail = async (to, resetLink) => {
  const msg = {
    to, // recipient
    from: {
      name: "CrypChat", // replace with your name or app name
      email: "akibkhan9984@gmail.com", // must be verified in SendGrid
    },
    subject: "Password Reset Request",
    html: `
      <p>We received a request to reset your password for your CrypChat account.
If you made this request, click the link below:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

export const sendResetSuccessEmail = async (to) => {
  const msg = {
    to,
    from: "akibkhan9984@gmail.com", // MUST be a verified sender!
    subject: "Password Reset Successful",
    text: "Your password has been successfully reset.",
    html: "<strong>Your password has been successfully reset.</strong>",
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Email sent to", to);
  } catch (error) {
    console.error("❌ Failed to send email:", error.response?.body || error);
  }
};
