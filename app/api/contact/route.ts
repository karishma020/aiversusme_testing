import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: "AI vs ME Contact Form", email: "support@torsecure.com" },
        to: [{ email: "support@torsecure.com", name: "TorSecure Support" }],
        replyTo: { email: email, name: name },
        subject: `[Contact Form] ${subject}`,
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #111; margin-bottom: 4px;">New Contact Form Submission</h2>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
            
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
            
            <div style="margin-top: 16px;">
              <strong>Message:</strong>
              <div style="margin-top: 8px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #ddd; white-space: pre-wrap;">${message}</div>
            </div>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
            <p style="color: #999; font-size: 12px;">Sent from AI vs ME contact form</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.message || "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
