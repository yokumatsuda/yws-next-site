// Layout.js
import Header from "components/header";
import Footer from "components/footer";
import BackToTop from "components/BackToTop";
// import LinkUsSection from "@/components/SocialLinksFloating";
import SocialLinksFloating from "@/components/SocialLinksFloating";

export default function Layout({ children }) {
  return (
    <div id="page-container" style={{ position: "relative" }}>
      <Header />
      <main>{children}</main>
      <SocialLinksFloating />
      <Footer />
      <BackToTop />
    </div>
  );
}
