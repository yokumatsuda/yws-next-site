import Header from "components/header";
import Footer from "components/footer";
import BackToTop from "components/BackToTop";

export default function Layout({ children }) {
  return (
    <div id="page-container" style={{ position: "relative" }}>
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}