import React from "react";
import Image from "next/image";
import MyNav from "../components/MyNav";
import MyFooter from "../components/MyFooter";
import rocket from "../public/rocket.png";
import fire from "../public/fire.png";
import smilling from "../public/smilling.png";
import sunglasses from "../public/sunglasses.png";
import profileSample from "../public/profile-sample.png";
import { PageSEO } from "../components/SEO";

const Card = ({ icon, title, text }) => {
  return (
    <section>
      <h2>
        <Image src={icon} alt="" width={40} height={40} />
        {title}
      </h2>
      <p>{text}</p>
    </section>
  );
};

const Features = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <PageSEO
        title="Shopline: Our Features"
        description="Shopline: Our Features"
      />
      <main className="header-nav remove-padding features">
        <MyNav />

        <h1>
          Packed with lots of
          <br />
          easy-to-use features
        </h1>
        <div className="features-container">
          <Card
            icon={rocket}
            text="Monitor your business in real time. See the
            top-selling products to maximise sales
            and profit. No setup needed "
            title="ANALYTICS"
          />
          <div className="center">
            <Card
              icon={sunglasses}
              title="TRUSTED SHOPS"
              text="Shops are publicly reviewed by
customers. The better your service,
the higher your rating"
            />
            <div className="center-img">
              <Image
                src={profileSample}
                alt=""
                width={400}
                height={600}
                objectFit="contain"
              />
            </div>
            <Card
              icon={smilling}
              title="FOLLOW SHOPS"
              text="Get to follow your favorite
businesses and get up-to-date with
their latest products, deals &amp; promos"
            />
          </div>
          <Card
            icon={fire}
            title="REFERRALS"
            text="Turn your customers into loyal fans.
Through Grow your reach to more
people through referrals by your loyal
customers"
          />
        </div>
        <section className="faq-compel ">
          <h2>
            Be the first to know &amp; try out new <br />
            amazing features
          </h2>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Your email here" />
            <button type="submit">Keep me Informed</button>
          </form>
        </section>
      </main>
      <MyFooter />
    </>
  );
};

export default Features;
