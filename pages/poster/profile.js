import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPosterProfile, updatePosterProfile } from "../../actions/poster";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const Profile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [verified, setVerified] = useState(false);

  const { loading, success, posterInfo, error } = useSelector(
    (store) => store.posterProfileGet
  );
  const {
    loading: uLoading,
    success: uSuccess,
    posterInfo: uPosterInfo,
    error: uError,
  } = useSelector((store) => store.posterProfileUpdate);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePosterProfile(email, name));
  };

  useEffect(() => {
    dispatch(getPosterProfile());
  }, [dispatch]);

  useEffect(() => {
    if (uPosterInfo) {
      const { name, username, email, picture } = uPosterInfo?.data;
      setEmail(email);
      setName(name);
      setPicture(picture || "");
      setUsername(username);
    }
  }, [uPosterInfo]);

  useEffect(() => {
    if (posterInfo) {
      const { name, username, email, picture } = posterInfo?.data;

      setEmail(email);
      setName(name);
      setPicture(picture || "");
      setUsername(username);
    }
  }, [posterInfo]);

  // useEffect(() => {}, []);

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
        <Container>
          <h1 className="main-header text-center py-5">Your Profile</h1>
          {loading ? (
            <Loader />
          ) : (
            <div className="form-container py-3">
              <Form onSubmit={handleSubmit}>
                {picture && (
                  <Image
                    src={picture}
                    width={600}
                    height={600}
                    objectFit="contain"
                    alt={name}
                  />
                )}
                <small className="text-muted mt-5 d-block">
                  ** Some fields have been locked
                </small>

                {uLoading && <Loader />}
                {uSuccess && (
                  <Message variant="success">{uPosterInfo.message}</Message>
                )}
                {uError && <Message variant="danger">{uError}</Message>}
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="about-form"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    className="about-form"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    className="about-form"
                    // onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Profile Image Link</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setPicture(e.target.value)}
                    value={picture}
                    readOnly
                  />
                </Form.Group>
                <Button size="lg" type="submit" className="my-3 blue-btn">
                  Update
                </Button>
              </Form>
            </div>
          )}
        </Container>
      </Layout>
    );
  }
};

export default Profile;
