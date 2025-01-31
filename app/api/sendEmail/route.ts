import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// API handler for POST requests
export async function POST(request: Request) {
  try {
    // Parse the incoming form data
    const formData = await request.formData();
    const aname = formData.get("aname") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Validate required fields
    if (!aname || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send email using Resend
    await resend.emails.send({
      from: "info@anazon.hadizproductions.com",
      to: "info@waterandpools.com",
      subject: "New message from your website",
      text: `Name: ${aname}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
