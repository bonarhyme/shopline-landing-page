import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({
  animation = "border",
  color = "white",
  width = "100px",
  height = "100px",
  display = "block",
}) => {
  return (
    <Spinner
      animation={animation}
      role="status"
      style={{
        width: { width },
        height: { height },
        margin: "auto",
        display: { display },
        color: { color },
      }}
    >
      {/* <span className="sr-only">Loading...</span> */}
    </Spinner>
  );
};

export default Loader;
