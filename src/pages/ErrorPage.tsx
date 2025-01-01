import { NavBar, Footer } from "../components";
import "./ErrorPageStyle.css";

const ErrorPage = () => {
  return (
    <div className="main-layout">
      <header className="nav-bar">
        <NavBar />
      </header>

      <main className="content">
        <div>
          <h1>Ooops...</h1>
          <p>Some thihnge went wrong!</p>
          <p>Please try again</p>
        </div>
      </main>

      <footer className="footer-bar">
        <Footer />
      </footer>
    </div>
  );
};

export default ErrorPage;
