import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, subject, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail", // Adjust to your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Ignore self-signed certificate errors
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `New message from ${name}: ${subject}: ${email}`,
      text: message,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
    });
  }
}
