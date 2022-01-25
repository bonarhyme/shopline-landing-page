import React, { useRef, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import CreateButton from "../components/CreateButton";
import MyFooter from "../components/MyFooter";
import MyNav from "../components/MyNav";

const data = [
  {
    summary: "How much does it cost?",
    p: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    summary: "What do I need to get started?",
    p: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    summary: "In what countries is Shopline available?",
    p: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    summary: "What are the benefits of selling with Shopline?",
    p: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    summary: "How do I receive payments?",
    p: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.  ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.  ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    summary: "Why should I use Shopline?",
    p: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

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
                      <p>{x.p}</p>
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
