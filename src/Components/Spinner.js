import React, { Component } from "react";
import loading from "./spinner.gif";

const Spinner = () => {
  return (
    <div className="text-center bg-color-lg">
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Spinner;
