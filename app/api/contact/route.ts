import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, reason, message } = await req.json();

  if (!firstName || !lastName || !email || !reason) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.eu",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"WeightLossPricesUK Contact" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ZOHO_EMAIL,
      replyTo: email,
      subject: `[Contact Form] ${reason}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Reason: ${reason}`,
        `Message:\n${message || "(no message)"}`,
      ].join("\n\n"),
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${message || "(no message)"}</p>
      `,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "SMTP error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
