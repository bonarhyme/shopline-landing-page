import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import EditPost from "../../../components/EditPost";
import Layout from "../../../components/Layout";

import Message from "../../../components/Message";

const Edit = () => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let poster;
    if (typeof window !== "undefined") {
      poster = sessionStorage.getItem("posterInfo");

      if (poster) {
        setVerified(true);
      } else {
        document.location.href = "/";
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
        <main>
          <Container>
            <EditPost />
          </Container>
        </main>
      </Layout>
    );
  }
};

export default Edit;
