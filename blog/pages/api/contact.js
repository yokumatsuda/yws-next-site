// pages/api/contact.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // POST以外は拒否
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    // ここで送信内容を整形（テキストメール）
    const text = `
【お問い合わせが届きました】

■お名前
${data.last_name ?? ""} ${data.first_name ?? ""}
（ふりがな）${data.last_name_kana ?? ""} ${data.first_name_kana ?? ""}

■メール
${data.email ?? ""}

■電話 / FAX
${data.phone ?? ""}
${data.fax ? `FAX: ${data.fax}` : ""}

■会社名 / 部署名
${data.company_name ?? ""}
${data.department_name ?? ""}

■住所
〒${data.postal_code ?? ""}
${data.prefecture ?? ""}${data.address ?? ""}

■項目
${data.inquiry_items ?? ""}

■内容
${data.inquiry_detail ?? ""}

■同意
${data.agreed ? "同意あり" : "同意なし"}
`.trim();

    // ✅ Resendで送信
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL, // onboarding@resend.dev
      to: process.env.CONTACT_TO_EMAIL, // yoku@yokuweb.com
      subject: "【お問い合わせ】Webサイトから新しい連絡があります",
      text,
      reply_to: data.email, // 返信ボタンで問い合わせ者へ返信できる
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Resend error:", e);
    return res.status(500).json({ error: "Mail send failed" });
  }
}
