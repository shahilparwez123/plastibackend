import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (order) => {
  try {
    console.log("📧 Sending email via Resend...");

    const itemsList = order.items.map(
      (i, index) =>
        `<li>${i.item.name} - ₹${i.item.price} x ${i.quantity}</li>`
    ).join("");

    await resend.emails.send({
      from: "onboarding@resend.dev", // works without domain setup
      to: [process.env.EMAIL_USER, order.email], // ✅ admin + customer
      subject: "🛒 Order Confirmation",
      html: `
        <h2>🎉 Order Confirmed!</h2>

        <p>Hi ${order.firstName},</p>

        <p>Your order has been successfully placed.</p>

        <h3>📦 Order Details:</h3>
        <ul>
          <li><b>Name:</b> ${order.firstName} ${order.lastName}</li>
          <li><b>Email:</b> ${order.email}</li>
          <li><b>Phone:</b> ${order.phone}</li>
          <li><b>Total:</b> ₹${order.total}</li>
          <li><b>Payment:</b> ${order.paymentMethod}</li>
        </ul>

        <h3>🛍 Items:</h3>
        <ul>${itemsList}</ul>

        <p>📍 Address:<br/>
        ${order.address}, ${order.city}, ${order.zipCode}</p>

        <p>Thank you for shopping with us ❤️</p>
      `,
    });

    console.log("✅ Email sent successfully");

  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};

export default sendEmail;