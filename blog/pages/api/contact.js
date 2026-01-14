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

    const adminText = `
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

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      subject: "【お問い合わせ】Webサイトから新しい連絡があります",
      text: adminText,
      replyTo: data.email,
    });

    /* ===============================
       ② ユーザー向け自動返信メール
    =============================== */
    const userText = `
${data.last_name ?? ""} ${data.first_name ?? ""} 様

この度は Yoku Web Service へお問い合わせいただき、
誠にありがとうございます。

以下の内容でお問い合わせを受け付けました。

--------------------
■ お問い合わせ内容
${data.inquiry_detail ?? ""}
--------------------

内容を確認のうえ、通常1〜2営業日以内に
担当者よりご連絡いたします。

本メールは自動送信です。
このメールに返信いただいても問題ございません。

──────────────────
Yoku Web Service
https://www.yokuwebservice.com
contact@yokuwebservice.com
──────────────────
`.trim();

    try {
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL,
        to: data.email,
        subject: "【Yoku Web Service】お問い合わせありがとうございます",
        text: userText,
        replyTo: process.env.CONTACT_TO_EMAIL, // ←ユーザーが返信したらあなたに届く（任意）
      });
    } catch (autoReplyError) {
      // ✅ 自動返信は失敗しても 200 を返す
      console.error("Auto-reply failed:", autoReplyError);
    }

    // ✅ ここは常に成功（管理者宛が送れた前提）
    return res.status(200).json({ ok: true });
  } catch (error) {
    // 管理者宛が失敗した場合はフォームも失敗
    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Mail send failed" });
  }
}
