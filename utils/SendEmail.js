import nodemailer from "nodemailer";

const sendEmail = async (order) => {
  try {
    console.log("EMAIL:", process.env.EMAIL_USER);
    console.log("PASS:", process.env.EMAIL_PASS);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🧾 FORMAT ITEMS
    const itemsList = order.items.map(
      (i, index) =>
        `${index + 1}. ${i.item.name} - ₹${i.item.price} x ${i.quantity}`
    ).join("\n");

    const message = `
🛒 NEW ORDER RECEIVED

👤 Customer: ${order.firstName} ${order.lastName}
📧 Email: ${order.email}
📱 Phone: ${order.phone}

📍 Address:
${order.address}, ${order.city}, ${order.zipCode}

💳 Payment: ${order.paymentMethod}
💰 Total: ₹${order.total}

📦 ITEMS:
${itemsList}

--------------------------
`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // send to yourself
      subject: "🛒 New Order Received",
      text: message,
    });

    console.log("✅ Email Sent");
  } catch (error) {
    console.log("❌ Email Error:", error);
  }
};

export default sendEmail;