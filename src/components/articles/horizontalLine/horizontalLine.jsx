import React from "react";

const horizontalLine = (props) => (
  <hr
    style={{
      color: props.color,
      backgroundColor: props.color,
      width: "100%",
      marginTop: "0",
    }}
  />
);

export default horizontalLine;
