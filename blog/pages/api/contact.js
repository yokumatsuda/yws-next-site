import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { last_name, first_name, email, phone, company_name, inquiry_detail } = req.body;

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      subject: "【お問い合わせ】Webサイトから新しい連絡があります",
      html: `
        <h2>お問い合わせ内容</h2>
        <p><strong>お名前：</strong>${last_name} ${first_name}</p>
        <p><strong>会社名：</strong>${company_name}</p>
        <p><strong>メール：</strong>${email}</p>
        <p><strong>電話：</strong>${phone}</p>
        <p><strong>内容：</strong><br/>${inquiry_detail}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Mail send failed" });
  }
}
