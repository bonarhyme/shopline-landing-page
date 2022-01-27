import Image from "next/image";
import React from "react";
import CreateButton from "../components/CreateButton";
import MyFooter from "../components/MyFooter";
import MyNav from "../components/MyNav";

import celebration from "../images/celebration.PNG";

const HowItWorks = () => {
  return (
    <>
      <main>
        <section className="header-nav remove-padding">
          <MyNav />
          <article className="how">
            <h1>
              Start earning in <span>3 steps</span>
            </h1>
            <p className="how-p">
              Sick of having to build a website to sell online? Want to reach
              more customers beyond just your locality? You can! Shopline
              enables entrepreneurs like you run an online business with your
              phone in just 3 steps.
            </p>
            <div>
              <p className="how-num one">1</p>
              <p className="how-what">Set up your Shop</p>
              <p className="how-p">
                Download the Shopline app <a href="/s">here</a> . Fill out a
                profile with details about your business
              </p>
            </div>

            <div>
              <p className="how-num two">2</p>
              <p className="how-what">Add products to your Catalogue</p>
              <p className="how-p">
                List items for sale at your own prices. No fees or expenses
                charged
              </p>
            </div>
            <div>
              <p className="how-num three">3</p>
              <p className="how-what">Start receiving orders</p>
              <p className="how-p">
                Never miss out on orders when you’re offline. Receive orders by
                SMS. No carrier charges applied
              </p>
            </div>
          </article>
          <article className="faq-compel">
            <h2>
              Congrats!!{" "}
              <Image
                src={celebration}
                alt=""
                width={50}
                height={50}
                objectFit="contain"
              />{" "}
              you are now ready to launch your online shop
            </h2>
            <CreateButton text1="YES, I AM IN" showLink2={false} />
          </article>
        </section>
      </main>
      <MyFooter />
    </>
  );
};

export default HowItWorks;
