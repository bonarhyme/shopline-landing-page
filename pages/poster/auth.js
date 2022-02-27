import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { loginPoster, registerPoster } from "../../actions/poster";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import MyNav from "../../components/MyNav";
import MyFooter from "../../components/MyFooter";

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const {
    loading: loadingReg,
    success,
    posterInfo,
    error: errorReg,
  } = useSelector((store) => store.posterRegister);
  const {
    loading: loadingLog,
    success: successLog,
    posterInfo: posterInfoLog,
    error: errorLog,
  } = useSelector((store) => store.posterLogin);

  const setValue = () => {
    setName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setMessage("Passwords do not match.");
    } else {
      dispatch(registerPoster(name, email, username, password));
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginPoster(username, password));
  };

  useEffect(() => {
    let timeOut;
    if (success) {
      timeOut = setTimeout(() => {
        setRegister(false);
        setValue();
      }, 3000);
    }

    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    let timeOut;
    if (successLog) {
      setValue();
      timeOut = setTimeout(() => {
        if (typeof window !== "undefined") {
          document.location.href = "/poster/profile";
        }
      }, 3000);
    }
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successLog]);

  return (
    <>
      <main className="header-nav remove-padding">
        <MyNav />
        <Container>
          <h1 className="main-header text-center py-5">
            {register ? "Register" : "Login"}
          </h1>
          <div className="form-container p-2 mb-5">
            <Form onSubmit={register ? handleRegister : handleLogin}>
              {register && errorReg && (
                <Message variant="danger">{errorReg}</Message>
              )}

              {register && loadingReg && <Loader />}
              {register && posterInfo && (
                <Message variant="success">
                  {posterInfo.message}.<br /> You can now login. <br />{" "}
                  **Redirecting to login page in 5 seconds..
                </Message>
              )}
              {errorLog && <Message variant="danger">{errorLog}</Message>}
              {loadingLog && <Loader />}
              {posterInfoLog && (
                <Message variant="success">
                  {posterInfoLog.message}.<br /> **Redirecting to your profile
                  in 3 seconds..
                </Message>
              )}
              {register && (
                <>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g John Doe"
                      className="about-form"
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="e.g name@example.com"
                      className="about-form"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                </>
              )}
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g John123"
                  className="about-form"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              {message && <Message variant="danger">{message}</Message>}
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  className="about-form"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage(null);
                  }}
                  required
                />
              </Form.Group>

              {register && (
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    className="about-form"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setMessage(null);
                    }}
                  />
                </Form.Group>
              )}

              <Button size="lg" type="submit">
                Submit
              </Button>

              <p>
                {register ? (
                  <span>
                    Already have an account?{" "}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setRegister((prev) => !prev)}
                    >
                      Login
                    </Button>{" "}
                  </span>
                ) : (
                  <>
                    <span>
                      Don&apos;t have an account?{" "}
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => setRegister((prev) => !prev)}
                      >
                        Register
                      </Button>{" "}
                    </span>
                  </>
                )}
              </p>
            </Form>
          </div>
        </Container>
      </main>
      <MyFooter />
    </>
  );
};

export default Auth;
