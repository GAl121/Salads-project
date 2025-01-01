import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./MainStyle.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header className="nav-bar">
        <NavBar />
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer-bar">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
