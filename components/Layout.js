import React from "react";
import MyFooter from "./MyFooter";
import MyNav from "./MyNav";

const Layout = ({ children, Headerr }) => {
  return (
    <>
      {!Headerr ? (
        <>
          <main className="header-nav remove-padding">
            <MyNav />
            {children}
          </main>
          <MyFooter />
        </>
      ) : (
        <>
          <div className="header-nav remove-padding">
            <MyNav />
            <header>
              <Headerr />
            </header>
            <main>{children}</main>
          </div>
          <MyFooter />
        </>
      )}
    </>
  );
};

Layout.tramp = "Herrooooo";

export default Layout;
