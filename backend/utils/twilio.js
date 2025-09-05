const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendWhatsAppNotification(manufacturerPhone, workerName, jobTitle) {
  try {
    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+917477050952`, 
      body: `Hello! \n${workerName} has applied for your job: "${jobTitle}".`,
    });
    console.log("WhatsApp notification sent!");
  } catch (error) {
    console.error("WhatsApp error:", error);
  }
}

module.exports = { sendWhatsAppNotification };
