import Link from "next/link";
import React from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { FiWifiOff } from "react-icons/fi";
import { BiGitBranch } from "react-icons/bi";

const MyWhyShopline = () => {
  return (
    <section className="why-shopline">
      <h2 className="main-header">Why Shopline?</h2>
      <div className="reasons-container">
        <div>
          <div>
            <HiOutlineLightningBolt size={45} color="#5458f7" />
          </div>
          <p>Super-fast setup</p>
          <p>
            Create your beautiful shop in 2 minutes, No code, No website needed{" "}
          </p>
        </div>
        <div>
          <div>
            <FiWifiOff size={45} color="#5458f7" />
          </div>
          <p>Save Mobile data</p>
          <p>
            Make sales even when you are offline. Receive orders by SMS. No
            carrier charges applied
          </p>
        </div>
        <div>
          <div>
            <BiGitBranch size={45} color="#5458f7" />
          </div>
          <p>Reach more customers</p>
          <p>
            Connect directly with customers anytime, wherever you are. No need
            for physical store
          </p>
        </div>
        <div>
          <div className="money">
            <div className="line"></div>
            <FaMoneyBillAlt size={45} color="#5458f7" />
          </div>
          <p>No Commissions charged</p>
          <p>
            We don&apos;t take commissions off any sales you make. Rather, we
            charge a monthly fee which gets smaller as your sales increase
          </p>
        </div>
      </div>

      <div className="auth-container">
        <a href="#">Create Shop for Free</a>
      </div>
    </section>
  );
};

export default MyWhyShopline;
