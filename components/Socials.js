import Image from "next/image";
import React from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import instagram from "../images/instagram.png";
import { appData } from "../variables/data";

const Socials = () => {
  return (
    <ul className="ul">
      <li className="social-icons">
        <a href={appData.facebook}>
          <FaFacebook size={35} color="#4267B2" />
        </a>
        <a href={appData.twitter}>
          <FaTwitter size={35} color="#1DA1F2" />
        </a>
        <a href={appData.instagram}>
          <Image
            src={instagram}
            width={35}
            height={35}
            objectFit="cover"
            alt=""
          />
        </a>
      </li>
    </ul>
  );
};

export default Socials;
