import React from "react";

const FormUrl = (props) => {
  return (
    <div>
      <input
        type="text"
        name="fireUrl"
        defaultValue={props.docUrl}
        disabled={true}
        hidden={true}
      />
    </div>
  );
};

export default FormUrl;
