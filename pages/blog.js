import Image from "next/image";
import React from "react";
import Layout from "../components/Layout";
import axios from "axios";

import Posts from "../components/Posts";
import { PageSEO } from "../components/SEO";
import Socials from "../components/Socials";

const Headerr = () => {
  return (
    <>
      <h1 className="blog-h1">The Shopline Blog</h1>
      <h2 className="blog-h2">
        Latest news, resources & tips for your business
      </h2>
    </>
  );
};

const blog = ({ serverRes }) => {
  return (
    <>
      <PageSEO
        description="Shopline: Latest news, resources & tips for your business"
        title="The Shopline Blog"
      />
      <Layout Headerr={Headerr}>
        <Posts serverRes={serverRes} />
        <article className="faq-compel">
          <h2>
            FOLLOW US <br />
          </h2>
          <p>
            For the latest news, inspirations & resources to grow your business
            online
          </p>
          <Socials />
        </article>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  let serverRes = null;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      appData.serverUrl + "/post/get-all-posts/?category&pageNumber=1",
      config
    );
    serverRes = data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { serverRes },
  };
}

export default blog;
