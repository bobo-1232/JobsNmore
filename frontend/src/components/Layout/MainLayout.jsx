import React from "react";
import "./custom.css";
import CustomBar from "../Navbar/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <CustomBar />
      <main>{children}</main>
      <footer id="bottom" className="mt-4" />
    </>
  );
}

export default MainLayout;
