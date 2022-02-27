import React from "react";
import MyFooter from "./MyFooter";
import MyNav from "./MyNav";

const Layout = ({ children }) => {
  return (
    <>
      <main className="header-nav remove-padding">
        <MyNav />
        {children}
      </main>
      <MyFooter />
    </>
  );
};

export default Layout;
