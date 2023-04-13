import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navigation.css";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav>
      <div className="menu-icon" onClick={toggleMenu}>
        <i className={showMenu ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={showMenu ? "menu-active" : ""}>
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/generic-summarizer">Generic Summarizer</Link>
        </li>
        <li>
          <Link to="/aspect-summarizer">Aspect-Based Summarizer</Link>
        </li>
        <li>
          <Link to="/view-history">View History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
