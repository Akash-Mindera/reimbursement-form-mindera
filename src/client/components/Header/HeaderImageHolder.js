import React from "react";

import MinderaSymbol from "../../assests/mindera-symbol.png";
import MinderaLogoMain from "../../assests/mindera-logo-2.png";
const HeaderImageHolder = (props) => {
  return (
    <div className="headerImage-div">
      <div style={{ textAlign: "center" }}>
        <img
          src={MinderaSymbol}
          style={{
            height: "80px",
            marginBottom: "20px",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <img
          src={MinderaLogoMain}
          style={{ height: "50px", width: "auto", marginBottom: "30px" }}
        />
      </div>
    </div>
  );
};

export default HeaderImageHolder;
