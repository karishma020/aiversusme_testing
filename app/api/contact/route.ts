import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // free resend default sender
      to: "support@torsecure.com",
      subject: `[Contact Form] ${subject}`,
      html: `
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
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}