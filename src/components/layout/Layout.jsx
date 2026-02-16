import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "../../styles/Layout.css";
import TopOfferBar from "./Header/TopOfferBar";
import UtilityHeader from "./Header/UtilityHeader";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <TopOfferBar />
      <UtilityHeader />
      <Header />
      <main className="layout-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
