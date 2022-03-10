import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { appData } from "../variables/data";
import { useSelector, useDispatch } from "react-redux";
import { getPosterProfile, logoutPosterNow } from "../actions/poster";

import SubScribeForm from "./SubScribeForm";
import Socials from "./Socials";
import { Button } from "react-bootstrap";

const MyFooter = () => {
  const dispatch = useDispatch();

  const { success: successLog } = useSelector((store) => store.posterLogin);

  useEffect(() => {
    dispatch(getPosterProfile());
  }, [dispatch, successLog]);

  const logoutPoster = () => {
    dispatch(logoutPosterNow());
  };
  const { posterInfo } = useSelector((state) => state.posterProfileGet);

  return (
    <footer>
      <div className="footer">
        <div className="footer-div-1">
          <Image
            src={appData.logo}
            alt="shopline logo"
            width={150}
            height={80}
            objectFit="contain"
          />

          <a href="mailto:support@joinshopline.com">support@joinshopline.com</a>
          <a href="tel:+256-75771-2667">+256-75771-2667</a>
        </div>
        <div>
          <h4>Company</h4>
          <ul className="ul">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/how">How it works</Link>
            </li>
            <li>
              <Link href="/compare">Compare</Link>
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h4>Help &amp; Support</h4>
          <ul className="ul">
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>

            {posterInfo && (
              <>
                <li>
                  <Link href="/poster/profile">
                    {posterInfo?.data?.username}
                  </Link>
                </li>
                {posterInfo?.data?.isAdmin && (
                  <li>
                    <Link href="/poster/dashboard">Dashboard</Link>
                  </li>
                )}
              </>
            )}

            {posterInfo?.data ? (
              <li>
                <Button variant="danger" size="sm" onClick={logoutPoster}>
                  Logout
                </Button>{" "}
              </li>
            ) : (
              <li>
                <Link href="/poster/auth">Auth</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Our Address</h4>
          <ul className="ul">
            <li>
              <address>Makerere University</address>
            </li>
            <li>
              <Socials />
            </li>

            <li>
              <SubScribeForm />
            </li>
          </ul>
        </div>
      </div>
      <p className="copyright">
        © Copyright {new Date().getFullYear()} Shopline
      </p>
    </footer>
  );
};

export default MyFooter;
