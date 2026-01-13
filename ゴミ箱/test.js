import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL, // onboarding@resend.dev
      to: process.env.CONTACT_TO_EMAIL, // あなたのGmail
      subject: "【お問い合わせ】テスト送信",
      text: JSON.stringify(data, null, 2),
      reply_to: data.email, // 返信先を問い合わせ者に
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Resend error:", e);
    return res.status(500).json({ error: "Mail send failed" });
  }
}
