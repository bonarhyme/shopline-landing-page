import Head from "next/head";

import MyNav from "../components/MyNav";
import MyHeader from "../components/MyHeader";
import MyHero from "../components/MyHero";
import MySlider from "../components/MySlider";
import MyWhyShopline from "../components/MyWhyShopline";
import MyFooter from "../components/MyFooter";

export default function Home() {
  return (
    <>
      <Head>
        <title>Join Shopline</title>
        <meta
          name="description"
          content="Shopline: Create your online shop in just 2 minutes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="header-nav">
          <MyNav />
          <MyHeader />
        </div>
        <div className="hero">
          <MyHero />
          <MySlider />
        </div>
        <div id="why">
          <MyWhyShopline />
        </div>
      </main>
      <MyFooter />
    </>
  );
}
