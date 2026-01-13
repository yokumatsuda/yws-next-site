// pages/api/contact.js

export default async function handler(req, res) {
  // POST以外は拒否
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    // 受け取れてるかログで確認（VercelのFunctionsログに出ます）
    console.log("Contact received:", data);

    // いったん成功で返す（ここでフォームが動く）
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
