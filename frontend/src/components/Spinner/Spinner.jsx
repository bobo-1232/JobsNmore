import React from "react";
import logo from "../../images/logos/png/logo-no-slogan.png";
import "./Spinner.css";

function Spinner() {
  return (
    <>
      <div id="center">
        <img id="image" src={logo}></img>
      </div>
    </>
  );
}

export default Spinner;
