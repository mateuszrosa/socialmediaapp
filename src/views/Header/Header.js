import React from "react";
import "./Header.module.scss";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header>
      <form action="">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Write here"
        />
        <input type="submit" value="Search" />
      </form>
      <img src={logo} alt="" />
    </header>
  );
};

export default Header;
