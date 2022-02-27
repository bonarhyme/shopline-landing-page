import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CreatePost from "../../components/CreatePost";
import Layout from "../../components/Layout";

import Message from "../../components/Message";

const Create = () => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let poster;
    if (typeof window !== "undefined") {
      poster = sessionStorage.getItem("posterInfo");

      if (!poster) {
        document.location.href = "/";
        sessionStorage.removeItem("posterInfo");
      } else {
        setVerified(true);
      }
    }
  }, []);

  if (!verified) {
    return (
      <Message variant="danger">
        You do not have access to view this page
      </Message>
    );
  } else {
    return (
      <Layout>
        <Container>
          <h1 className="main-header text-center py-5">Create New Post</h1>

          <div>
            <CreatePost />
          </div>
        </Container>
      </Layout>
    );
  }
};

export default Create;
