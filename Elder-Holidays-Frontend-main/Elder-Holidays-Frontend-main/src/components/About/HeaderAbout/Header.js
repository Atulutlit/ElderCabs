import React from "react";
import Nav from "../../Header/Nav/Nav";
import "./Header.css";
export const Header = () => {
  return (
    <header className="header">
      <Nav></Nav>
      <div className="content_about">
        <h1>ABOUT</h1>
        <p>The whole India Awaits.</p>
      </div>
    </header>
  );
};
