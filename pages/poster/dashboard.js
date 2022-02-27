import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import AdminPostsList from "../../components/AdminPostsList";
import Message from "../../components/Message";
import PostersList from "../../components/PostersList";
import Layout from "../../components/Layout";

const Dashboard = () => {
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
          <h1 className="main-header text-center py-5">Dashboard</h1>

          <PostersList />
          {/* <AdminPostsList /> */}
        </Container>
      </Layout>
    );
  }
};

export default Dashboard;
