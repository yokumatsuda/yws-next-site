import React, { useState } from "react";
import styles from "styles/contactPage.module.css"; // 自作CSSを読み込む例

const prefecturesList = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

function ContactPage() {
  // =================== 各種 state ===================
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastNameKana, setLastNameKana] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [address, setAddress] = useState("");
  const [inquiryItems, setInquiryItems] = useState([]);
  const [inquiryDetail, setInquiryDetail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // =================== イベントハンドラ ===================
  const handleInquiryItemsChange = (item) => {
    if (inquiryItems.includes(item)) {
      setInquiryItems(inquiryItems.filter((i) => i !== item));
    } else {
      setInquiryItems([...inquiryItems, item]);
    }
  };

  // ▼ 郵便番号が7桁になったらAPIで住所を自動取得する例
  const handlePostalCodeBlur = async () => {
    // 入力が7桁ではなければ処理しない
    if (postalCode.length !== 7) return;

    try {
      // zipcloud API へリクエスト
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`);
      const data = await res.json();

      if (data.status !== 200 || !data.results) {
        console.log("住所取得に失敗:", data.message);
        return;
      }

      // data.results[0] に都道府県, 市区町村, 町域が入っている
      const result = data.results[0];
      const newPref = result.address1; // 都道府県
      const cityTown = result.address2 + result.address3; // 市区町村 + 町域

      // ▼ React state に反映
      setPrefecture(newPref);
      setAddress(cityTown);
    } catch (error) {
      console.error("住所検索失敗:", error);
    }
  };

  // ▼ フォーム送信
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // (バリデーション例)
    if (!lastName || !firstName) {
      setErrorMessage("お名前（姓・名）は必須です");
      return;
    }
    if (!email) {
      setErrorMessage("メールアドレスは必須です");
      return;
    }
    if (email !== emailConfirm) {
      setErrorMessage("メールアドレス（確認）が一致しません");
      return;
    }
    if (!phone) {
      setErrorMessage("電話番号は必須です");
      return;
    }
    if (!companyName) {
      setErrorMessage("会社名または団体名は必須です");
      return;
    }
    if (!inquiryDetail) {
      setErrorMessage("お問い合わせ詳細は必須です");
      return;
    }
    if (!agreed) {
      setErrorMessage("個人情報の取り扱いに同意いただく必要があります");
      return;
    }

    // サーバーへ送信例
    try {
      const bodyData = {
        last_name: lastName,
        first_name: firstName,
        last_name_kana: lastNameKana,
        first_name_kana: firstNameKana,
        email,
        phone,
        fax,
        company_name: companyName,
        department_name: departmentName,
        postal_code: postalCode,
        prefecture,
        address,
        inquiry_items: inquiryItems.join(","),
        inquiry_detail: inquiryDetail,
        agreed,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const result = await res.json();
      if (!res.ok) {
        setErrorMessage(result.error || "送信に失敗しました");
      } else {
        alert("お問い合わせを受け付けました。ありがとうございます。");
        // フォームリセット
        setLastName("");
        setFirstName("");
        setLastNameKana("");
        setFirstNameKana("");
        setEmail("");
        setEmailConfirm("");
        setPhone("");
        setFax("");
        setCompanyName("");
        setDepartmentName("");
        setPostalCode("");
        setPrefecture("");
        setAddress("");
        setInquiryItems([]);
        setInquiryDetail("");
        setAgreed(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage("通信エラーが発生しました: " + err.message);
      } else {
        setErrorMessage("通信エラーが発生しました（詳細不明）");
      }
    }
  };

  const privacyHtml = `【個人情報の取り扱いについて】  
Yoku Web サービス（以下、「当事業所」）は、お客様からご提供いただく個人情報を以下の内容に基づき取り扱います。  

１．取得する情報の項目  
当事業所では、以下の情報を主に取得する場合があります。  
- お名前（フリガナ含む）  
- メールアドレス  
- 電話番号・FAX番号  
- 会社名または団体名、部署名  
- 郵便番号・住所（都道府県、市区町村、町名番地など）  
- お問い合わせ内容やその他任意でご提供いただく情報  

２．利用目的  
当事業所は、取得した個人情報を以下の目的で利用いたします。  
- お問い合わせ・ご相談への対応  
- サービスや製品に関するご案内・情報提供  
- アンケートやキャンペーン等のご案内  
- 製品・サービスの改善やマーケティング分析  
- その他、お客様とのやりとりを円滑に行うための各種業務  

３．保管期間  
取得した個人情報は、上記の利用目的に必要な範囲内で保管します。  
目的が達成され、保管の必要がなくなった情報は、法令および当事業所の規定に従い、安全な方法で速やかに廃棄または削除いたします。  

４．個人情報の管理と保護（安全管理措置）  
当事業所は、取得した個人情報を適切に管理し、法令および当事業所の規定に従い、漏洩や不正アクセスを防止するよう努めます。  
具体的には、情報セキュリティ対策として以下の措置を講じています。  
- システムへのアクセス制限  
- ウイルス対策ソフトウェアやファイアウォール等の導入  
- 関係者以外のアクセス制限や鍵の管理、施錠保管  
- 従業者への教育・監督  

５．第三者への提供  
当事業所は、法令で認められる場合を除き、お客様の同意なく個人情報を第三者へ開示・提供いたしません。  

６．外部委託について  
当事業所は、サービス提供や業務遂行のために個人情報の取り扱いを外部に委託することがあります。その場合は、委託先との間で個人情報保護に関する契約を締結し、適切な監督を行います。  

７．クッキー（Cookie）やアクセスログの利用  
当事業所のWebサイトでは、サービス向上や利用状況分析のため、クッキーやアクセス解析ツールを使用する場合があります。これらの仕組みにより収集される情報は、個人が特定できる形で利用するものではありません。ご利用のブラウザ設定でクッキーの受け取りを拒否することも可能です。  

８．未成年者の個人情報  
未成年者がお問い合わせやお申し込みを行う場合、必ず保護者の同意のもとに行っていただくようお願いいたします。必要に応じて保護者からの同意を確認させていただく場合があります。  

９．個人情報の送信方法（通信の暗号化）  
当事業所のフォームやWebサイトでは、SSL/TLSによる通信暗号化を導入し、外部からの盗聴や改ざんを防止するよう努めています。  

１０．個人情報の開示・訂正・削除  
お客様は当事業所に対し、ご自身の個人情報の開示・訂正・削除を請求することができます。手続きにつきましては下記お問い合わせ先までご連絡ください。  

１１．改定について  
本ポリシーは、法令の改正や事業内容の変更などに伴い、事前の予告なく改定される場合があります。最新の内容は当事業所のWebサイトに掲載いたします。  

【お問い合わせ窓口】  
Yoku Web サービス  
E-mail: yoku@yokuweb.com  
TEL: 076-205-7913  

個人情報の提出は任意ですが、必要事項をご提供いただけない場合は十分なサービス提供ができない場合がございます。  
同意頂ける場合はチェックボックスにご入力ください。`;

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.title}>お問い合わせ</h2>

      {errorMessage && <div className={styles.errorBox}>{errorMessage}</div>}

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        {/* お名前（姓・名） */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            お名前 <span className={styles.required}>*</span>
          </label>
          <div className={styles.formRow}>
            <input
              type="text"
              className={styles.contactInput}
              placeholder="姓"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              className={styles.contactInput}
              placeholder="名"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>

        {/* お名前（ふりがな） */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>お名前（ふりがな）</label>
          <div className={styles.formRow}>
            <input
              type="text"
              className={styles.contactInput}
              placeholder="せい"
              value={lastNameKana}
              onChange={(e) => setLastNameKana(e.target.value)}
            />
            <input
              type="text"
              className={styles.contactInput}
              placeholder="めい"
              value={firstNameKana}
              onChange={(e) => setFirstNameKana(e.target.value)}
            />
          </div>
        </div>

        {/* メールアドレス */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            メールアドレス <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            className={styles.contactInput}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* メールアドレス（確認） */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>メールアドレス（確認）</label>
          <input
            type="email"
            className={styles.contactInput}
            placeholder="Email確認"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
          />
        </div>

        {/* 電話 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            電話 <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.contactInput}
            placeholder="電話番号"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* FAX */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>FAX</label>
          <input
            type="text"
            className={styles.contactInput}
            placeholder="FAX番号"
            value={fax}
            onChange={(e) => setFax(e.target.value)}
          />
        </div>

        {/* 会社名 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            会社名または団体名 <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.contactInput}
            placeholder="○○株式会社"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        {/* 部署名 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>部署名</label>
          <input
            type="text"
            className={styles.contactInput}
            placeholder="部署名"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </div>

        {/* 郵便番号 (Blur時に住所を検索) */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>郵便番号</label>
          <input
            type="text"
            className={styles.contactInput}
            placeholder="1234567"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value.replace(/-/g, ""))}
            onBlur={handlePostalCodeBlur}
          />
          <p className={styles.hint}>7桁(ハイフン無し)で入力してください。</p>
        </div>

        {/* 都道府県 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>都道府県</label>
          <select
            className={styles.contactSelect}
            value={prefecture}
            onChange={(e) => setPrefecture(e.target.value)}
          >
            <option value="">選択してください</option>
            {prefecturesList.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </div>

        {/* 住所 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>住所</label>
          <input
            type="text"
            className={styles.contactInput}
            placeholder="〇〇市〇〇町123-4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* 問い合わせ項目 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>お問い合わせ内容</label>
          <div className={styles.checkboxRow}>
            <label className={styles.checkboxLabel}>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                checked={inquiryItems.includes("システム開発")}
                onChange={() => handleInquiryItemsChange("システム開発")}
              />
              システム開発
            </label>
            <label className={styles.checkboxLabel}>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                checked={inquiryItems.includes("Web制作")}
                onChange={() => handleInquiryItemsChange("Web制作")}
              />
              Web制作
            </label>
            <label className={styles.checkboxLabel}>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                checked={inquiryItems.includes("業務代行")}
                onChange={() => handleInquiryItemsChange("業務代行")}
              />
              業務代行
            </label>
            <label className={styles.checkboxLabel}>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                checked={inquiryItems.includes("納期・見積")}
                onChange={() => handleInquiryItemsChange("納期・見積")}
              />
              納期・見積
            </label>
          </div>
        </div>

        {/* 詳細 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            詳細をご記入ください <span className={styles.required}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            rows={5}
            value={inquiryDetail}
            onChange={(e) => setInquiryDetail(e.target.value)}
          ></textarea>
        </div>

        {/* 個人情報同意 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>個人情報の取り扱い</label>
          <div className={styles.privacyBox} dangerouslySetInnerHTML={{ __html: privacyHtml }} />
          <label className={styles.checkboxLabel}>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            上記の個人情報取り扱いに同意します
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>
          送信
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
