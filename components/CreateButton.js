import React from "react";

const CreateButton = ({
  url1 = "#",
  text1 = "Create Shop for Free",
  url2 = "#",
  text2 = "Login",
  showLink2 = true,
}) => {
  return (
    <div className="auth-container">
      <a href={url1}>{text1}</a>

      {showLink2 && <a href={url2}>{text2}</a>}
    </div>
  );
};

export default CreateButton;
