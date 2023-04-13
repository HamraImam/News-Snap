import React from 'react';
import logo from '../../assets/logo.png';
import Login from '../Login/Login';
import '../../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>
      <h1 className="header__title">News Snap</h1>
      <div className="header__right">
        <Login />
      </div>
    </header>
  );
};

export default Header;
