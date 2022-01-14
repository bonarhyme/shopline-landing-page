import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import { appData } from "../variables/data";

const MyNav = () => {
  return (
    <Container fluid>
      <nav>
        <div className="logo-container">
          <Image
            src={appData.logo}
            alt="shopline logo"
            width={150}
            height={80}
            objectFit="contain"
          />
        </div>
        <div className="download-container">
          <a
            href="#"
            className="nav-icon-container"
            target="_blank"
            rel="noopener noreferrer "
          >
            <Image
              src={appData.google}
              alt="Google Play"
              width={150}
              height={80}
              objectFit="contain"
            />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer "
            className="nav-icon-container"
          >
            <Image
              src={appData.apple}
              alt="Appstore"
              width={110}
              height={80}
              objectFit="contain"
            />
          </a>
        </div>
      </nav>
    </Container>
  );
};

export default MyNav;
