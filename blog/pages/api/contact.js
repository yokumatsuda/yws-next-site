// pages/api/contact.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const data = req.body;

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

    // ✅ ここ追加：環境変数が本番で読めてるか確認（値は出さない）
    console.log("ENV check:", {
      hasApiKey: !!process.env.RESEND_API_KEY,
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
    });

    const result = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL, // onboarding@resend.dev
      to: process.env.CONTACT_TO_EMAIL, // yoku@yokuweb.com
      subject: "【お問い合わせ】Webサイトから新しい連絡があります",
      text,
      reply_to: data.email,
    });

    // ✅ ここ追加：Resendの返り値（成功なら id が出る）
    console.log("Resend result:", result);

    return res.status(200).json({ ok: true, result });
  } catch (e) {
    console.error("Resend error:", e);
    return res.status(500).json({
      error: "Mail send failed",
      detail: e?.message ?? String(e),
    });
  }
}
