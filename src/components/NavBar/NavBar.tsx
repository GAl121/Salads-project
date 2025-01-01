import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./NavBarStyle.css";

const iconAddress: string =
  "https://helfy.co/wp-content/uploads/2022/02/Helfy-Logo.svg";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <img src={iconAddress} alt="Helfy Logo" />
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </header>

      <div className={`sidebar ${isMenuOpen ? "show-sidebar" : ""}`}>
        {isMenuOpen && (
          <button className="close-btn" onClick={toggleMenu}>
            x
          </button>
        )}

        <nav>
          <ul>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/new-ingredient"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Create Ingredient
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/new-salad"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Create salad
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trivia"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Trivia
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
