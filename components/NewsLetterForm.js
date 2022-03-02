import { useState } from "react";
import { decode } from "html-entities";
import { Form, Button } from "react-bootstrap";

import Message from "./Message";

const NewsletterForm = ({ status, message, onValidated }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  const handleFormSubmit = () => {
    setError(null);

    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email });

    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  const handleInputKeyEvent = (event) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  };

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : null;
  };

  return (
    <>
      <div className="mt-5">
        <h5 className="my-2" style={{ fontWeight: "400" }}>
          SIGN UP FOR NEWSLETTER
        </h5>
        <Form.Group>
          <Form.Control
            onChange={(event) => setEmail(event?.target?.value ?? "")}
            type="email"
            placeholder="Your email"
            className="mr-2"
            onKeyUp={(event) => handleInputKeyEvent(event)}
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleFormSubmit}
          className="my-2 text-center"
          size="lg"
        >
          Subscribe
        </Button>
      </div>
      <div style={{ fontSize: "1.5rem" }}>
        {status === "sending" && <Message variant="info">Sending... </Message>}

        {status === "error" || error ? (
          <Message variant="danger">
            <div
              className="newsletter-form-error"
              dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
            />
          </Message>
        ) : null}
        {status === "success" && status !== "error" && !error && (
          <Message variant="success">
            <div dangerouslySetInnerHTML={{ __html: decode(message) }} />
          </Message>
        )}
      </div>
    </>
  );
};

export default NewsletterForm;
