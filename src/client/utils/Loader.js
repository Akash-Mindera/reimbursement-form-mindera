import React from "react";

const Loader = () => {
  return (
    <div>
      <div
        className="ui segment"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
          zIndex: "10",
        }}
      >
        <div className="ui active dimmer">
          <div className="ui indeterminate text loader">Preparing Files</div>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default Loader;
