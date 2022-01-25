import React from "react";
import CreateButton from "./CreateButton";

const MyHeader = () => {
  return (
    <header>
      <h1 className="header-h1">
        Create your online shop just in <span>2 minutes</span>
      </h1>
      <p className="notice">No website needed</p>
      <CreateButton />
      <section className="center">
        <div className="header-list">
          <p data-aos="fade-right">
            <b>500+</b> Active Shoppers
          </p>

          <p data-aos="zoom-in">
            <b>6000+</b> Orders placed
          </p>

          <p data-aos="fade-left" className="last">
            <b>10,000+</b> Items Listed
          </p>
        </div>
      </section>
    </header>
  );
};

export default MyHeader;
