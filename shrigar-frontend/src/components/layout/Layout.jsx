import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "../../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
