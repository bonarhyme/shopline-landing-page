import React, { useRef, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import CreateButton from "../components/CreateButton";
import MyFooter from "../components/MyFooter";
import MyNav from "../components/MyNav";
import Link from "next/link";
import parse from "html-react-parser";

const data = [
  {
    summary: "How much does it cost?",
    p: `Shopline is free to use. No setup fees charged. No commissions. No ads. No hidden charges.. If you'd love to support please send us an email at <a href="mailto:support@joinshopline.com">support@joinshopline.com</a>`,
  },
  {
    summary: "What do I need to get started?",
    p: "All you need is your phone with mobile data and download the Shopline app here",
  },
  {
    summary: "In what countries is Shopline available?",
    p: "Shopline is available to any entrepreneur on the African continent. You can sell anytime, anywhere and to anyone",
  },
  {
    summary: "What are the benefits of selling with Shopline?",
    p: `•No
    commissions so you enjoy higher profits selling on Shopline<br />•Save 80%
    mobile data selling online by receiving orders through SMS. No
    carrier charges applied.<br />•Easy to use, all you need is 2 minutes and
    you ready to start receiving orders. No delays.<br />•More customers.
    1000s of orders have been made on Shopline. There's
    no better time to reach those customers than downloading Shopline now`,
  },
  {
    summary: "How do I receive payments?",
    p: `Payments are made on delivery by the customer.
    Digital payments are soon coming your way. You don't wanna miss out`,
  },
  {
    summary: "Why should I use Shopline?",
    p: `There's a 1000 reasons to
    use Shopline. <a href="/#">Here</a> are our top 4`,
  },
];

const Here = () => {
  return (
    <>
      There&apos;s a 1000 reasons to use Shopline <Link href="/#why">Here</Link>{" "}
      are our top 4
    </>
  );
};

const Faq = () => {
  const [list, setList] = useState(data);
  const userRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userRef.current.value.toLowerCase()) {
      return setList(data);
    }
    const filtered = list.filter((x) => {
      const y = x.summary.toLowerCase();
      return y.includes(userRef.current.value.toLowerCase());
    });
    setList(filtered);
  };

  return (
    <>
      <main className="faq">
        <section className="header-nav remove-padding">
          <MyNav />

          <article className="faq-questions">
            <h1>How may we help you?</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search for a topic or a question"
                ref={userRef}
              />
              <button type="submit">Find an answer</button>
            </form>
            <div className="faq-details-container">
              {list &&
                list.map((x, i) => {
                  return (
                    <details key={i}>
                      <summary>{x.summary}</summary>
                      <p>
                        {x.summary === "Why should I use Shopline?" ? (
                          <Here />
                        ) : (
                          parse(x.p)
                        )}
                      </p>
                    </details>
                  );
                })}
            </div>
            <p className="have-more-question">
              Have more questions, reach out to us{" "}
              <a href="mailto:hello@joinshopline.com">hello@joinshopline.com</a>
            </p>

            <ul className="ul no-padding">
              <li className="social-icons">
                <a href="#">
                  <FaFacebook size={20} color="blue" />
                </a>
                <a href="#">
                  <FaTwitter size={20} color="steelblue" />
                </a>
                <a href="#">
                  <FaInstagram size={20} color="purple" />
                </a>
              </li>
            </ul>
          </article>

          <article className="faq-compel">
            <h2>
              Ready to go from idea to a business in <br className="hide-xs" />{" "}
              2 minutes?
            </h2>
            <CreateButton text1="YES, SIGN ME UP" showLink2={false} />
          </article>
        </section>
      </main>
      <MyFooter />
    </>
  );
};

export default Faq;
