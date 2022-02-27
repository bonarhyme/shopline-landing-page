import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Image from "next/image";

import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updatePosterPicture } from "../actions/poster";
import Loader from "./Loader";
import Message from "./Message";

const PictureUpdate = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState("");

  const { loading, success, posterInfo, error } = useSelector(
    (state) => state.posterProfileGet
  );
  const {
    loading: uLoading,
    success: uSuccess,
    posterInfo: uPosterInfo,
    error: uError,
  } = useSelector((state) => state.posterPicture);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image) {
      dispatch(updatePosterPicture(image));
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {uLoading && <Loader />}
        {uSuccess && <Message variant="success">{uPosterInfo.message}</Message>}
        {uError && <Message variant="danger">{error}</Message>}
        {!image && posterInfo?.data && (
          <Image
            src={posterInfo?.data?.picture}
            alt=""
            height="400"
            width="400"
            objectFit="contain"
            className="p-1"
          />
        )}
        {image && (
          <Image
            src={URL.createObjectURL(image)}
            alt=""
            height="400"
            width="400"
            objectFit="contain"
            className="p-1"
          />
        )}
        <Form.Group>
          <Form.Label
            className=" mb-2 mt-5"
            title="Select Image"
            style={{ cursor: "pointer" }}
            htmlFor="image"
          >
            <FaPlusCircle size={30} color="white" /> Select Pictures
          </Form.Label>
          <Form.Control
            type="file"
            accept="/image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
            name="image"
            id="image"
          />
        </Form.Group>
        <Button type="submit" variant="outline-primary" size="sm">
          Update Profile picture
        </Button>
      </Form>
    </div>
  );
};

export default PictureUpdate;
