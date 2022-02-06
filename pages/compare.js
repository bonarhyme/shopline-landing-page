import React, { useEffect, useState } from "react";
import MyNav from "../components/MyNav";
import MyFooter from "../components/MyFooter";
import { Logo } from "../components/MyNav";
import {
  FaWhatsappSquare,
  FaInstagram,
  FaBox,
  FaShopify,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import CreateButton from "../components/CreateButton";

const companies = {
  "Whatsapp Business": {
    pricing: 0,
    rating: false,
    support: false,
    sms: false,
    custom: false,
    real: false,
    engage: true,
    logo: <FaWhatsappSquare color="green" size={30} />,
  },
  Jumia: {
    pricing: 0,
    rating: true,
    support: false,
    sms: false,
    custom: false,
    real: false,
    engage: true,
    logo: <FaBox size={30} />,
  },
  Instagram: {
    pricing: 0,
    rating: false,
    support: false,
    sms: false,
    custom: false,
    real: false,
    engage: true,
    logo: <FaInstagram size={30} />,
  },
  Shopify: {
    pricing: 0,
    rating: false,
    support: false,
    sms: false,
    custom: false,
    real: false,
    engage: true,
    logo: <FaShopify size={30} />,
  },
  "Safeboda Shop": {
    pricing: 0,
    rating: false,
    support: false,
    sms: false,
    custom: false,
    real: false,
    engage: true,
    logo: <FaBox size={30} />,
  },
};

const Compare = () => {
  const [competitor, setCompetitor] = useState("Whatsapp Business");

  useEffect(() => {
    console.log(competitor);
  }, [competitor]);

  return (
    <>
      <main>
        <section className="header-nav remove-padding">
          <MyNav />
          <article className="compare">
            <h1>Here is how we compare</h1>
            <h2>Lots of amazing features, for less</h2>
            <div className="select-container">
              <span className="compare-span">Compare with</span>{" "}
              <select onChange={(e) => setCompetitor(e.target.value)}>
                <option value="" disabled>
                  Tap here to select
                </option>
                <option value="Jumia">Jumia</option>
                <option value="Instagram">Instagram</option>
                <option value="Whatsapp Business">Whatsapp Business</option>
                <option value="Shopify">Shopify</option>
                <option value="Safeboda Shop">Safeboda Shop</option>
              </select>
            </div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <Logo />
                  </th>
                  <th>
                    {companies[competitor].logo}
                    <span className="block competitor">{competitor}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pricing</td>
                  <td>
                    $0<span className="block">Per month</span>
                  </td>
                  <td>
                    ${companies[competitor].pricing}
                    <span className="block">Per month</span>
                  </td>
                </tr>
                <tr>
                  <td>Seller Rating</td>
                  <td>
                    <FaCheck size={20} />
                  </td>
                  <td>
                    {companies[competitor].rating ? (
                      <FaCheck size={20} />
                    ) : (
                      <FaTimes size={20} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Customer Support</td>
                  <td>
                    <FaCheck size={20} />
                  </td>
                  <td>
                    {companies[competitor].support ? (
                      <FaCheck size={20} />
                    ) : (
                      <FaTimes size={20} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>SMS Notification</td>
                  <td>
                    <FaCheck size={20} />
                  </td>
                  <td>
                    {companies[competitor].sms ? (
                      <FaCheck size={20} />
                    ) : (
                      <FaTimes size={20} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Customization</td>
                  <td>
                    <FaCheck size={20} />
                  </td>
                  <td>
                    {companies[competitor].custom ? (
                      <FaCheck size={20} />
                    ) : (
                      <FaTimes size={20} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Real-time Analysis</td>
                  <td>
                    <FaCheck size={20} />
                  </td>
                  <td>
                    {companies[competitor].real ? (
                      <FaCheck size={20} />
                    ) : (
                      <FaTimes size={20} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Engage Customers</td>
                  <td>
                    <FaCheck size={20} />
                  </td>
                  <td>
                    {companies[competitor].engage ? (
                      <FaCheck size={20} />
                    ) : (
                      <FaTimes size={20} />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ textAlign: "center" }}>
              <CreateButton text1="Start Selling Now" showLink2={false} />
            </div>
          </article>
          <article className="faq-compel blue">
            <h2>
              Worried you’ll never start your own <br className="hide-xs" />{" "}
              business?
            </h2>
            <p>All you need is 2 minutes. No setup fees charged</p>
            <CreateButton text1="Show me How" showLink2={false} />
          </article>
        </section>
      </main>
      <MyFooter />
    </>
  );
};

export default Compare;
