import React from "react";

const horizontalLine = props => (
  <hr
    style={{
      color: props.color,
      backgroundColor: props.color,
      height: 1,
      width: "100%"
    }}
  />
);

export default horizontalLine;
