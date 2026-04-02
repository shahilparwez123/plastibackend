import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (order) => {
  try {
    console.log("📧 Sending email via Resend...");

    const itemsList = order.items.map(
      (i, index) =>
        `<p>${index + 1}. ${i.item.name} - ₹${i.item.price} x ${i.quantity}</p>`
    ).join("");

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [process.env.EMAIL_USER], // ✅ only you
      subject: "🛒 New Order Received",
      html: `
        <h2>🛒 NEW ORDER RECEIVED</h2>

        <p>👤 <b>Customer:</b> ${order.firstName} ${order.lastName}</p>
        <p>📧 <b>Email:</b> ${order.email}</p>
        <p>📱 <b>Phone:</b> ${order.phone}</p>

        <p>📍 <b>Address:</b><br/>
        ${order.address}, ${order.city}, ${order.zipCode}</p>

        <p>💳 <b>Payment:</b> ${order.paymentMethod}</p>
        <p>💰 <b>Total:</b> ₹${order.total}</p>

        <h3>📦 ITEMS:</h3>
        ${itemsList}

        <br/>
        <p>--------------------------</p>
      `,
    });

    console.log("✅ Email sent successfully");

  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};

export default sendEmail;