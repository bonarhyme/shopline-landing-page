import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../actions/posts";
import { CREATE_POST_RESET } from "../constants/posts";
import Loader from "./Loader";
import Message from "./Message";
import Preview from "./Preview";

const cats = ["Entertainment", "Business", "World"];

const CreatePost = ({ newPost = true, editPost = false }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [coverImage, setCoverImage] = useState([]);
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [category, setCategory] = useState("Business");
  const [subTitle, setSubTitle] = useState("");
  const [preview, setPreview] = useState(false);

  const { loading, success, serverReply, error } = useSelector(
    (store) => store.postCreate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost) {
      dispatch(createPost(coverImage, title, markdown, category, subTitle));
    }
  };

  const resetLocalStorage = () => {
    if (window.confirm("Are you sure you want to get rid of your draft?")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("post");
        setCategory("");
        setCoverImage([]);
        setTitle("");
        setSubTitle("");
        setMarkdown("");
      }
    }
  };

  const handleLocalStorageSet = (e) => {
    let thePost = localStorage.getItem("post")
      ? JSON.parse(localStorage.getItem("post"))
      : null;

    localStorage.setItem(
      "post",
      JSON.stringify({
        ...thePost,
        [e.target.name]: e.target.value,
      })
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let thePost = localStorage.getItem("post")
        ? JSON.parse(localStorage.getItem("post"))
        : null;

      if (thePost) {
        const { title, markdown, subTitle, coverImage, category } = thePost;
        setTitle(title);
        setMarkdown(markdown);
        setSubTitle(subTitle);
        setCoverImage(coverImage);
        setCategory(category);
      }
    }
  }, []);

  useEffect(() => {
    if (success) {
      router.push("/post/" + serverReply.data.slug);
      setCategory({});
      setCoverImage({});
      setTitle("");
      setSubTitle("");
      setMarkdown("");
      dispatch({ type: CREATE_POST_RESET });
      if (typeof window !== "undefined") {
        localStorage.removeItem("post");
      }
    }
  }, [success, router, serverReply, dispatch]);

  const previewHandler = () => {
    setPreview((prev) => !prev);
    console.log(typeof coverImage);
  };

  return (
    <>
      {coverImage && preview ? (
        <Preview
          coverImage={coverImage}
          subTitle={subTitle}
          title={title}
          category={category}
          markdown={markdown}
          onClick={previewHandler}
        />
      ) : (
        <div className="create">
          <Form
            style={{
              width: "100%",
              maxWidth: "900px",
            }}
            className="d-block mx-auto"
            onSubmit={handleSubmit}
          >
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            {success && (
              <Message variant="success">{serverReply.message}</Message>
            )}
            <Form.Group>
              <Form.Label htmlFor="coverImage">Cover Image</Form.Label>

              <Form.Control
                type="file"
                accept="/image/*"
                onChange={(e) => {
                  setCoverImage(e.target.files[0]);
                  handleLocalStorageSet(e);
                }}
                required
                autoFocus
                name="coverImage"
                id="coverImage"
                // value={coverImage}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g How to make your own ice cream at home"
                onChange={(e) => {
                  setTitle(e.target.value);
                  handleLocalStorageSet(e);
                }}
                required
                name="title"
                id="title"
                value={title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="subTitle">Sub Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g Ice creams are essential for every homes. In this post we learn how to make..."
                onChange={(e) => {
                  setSubTitle(e.target.value);
                  handleLocalStorageSet(e);
                }}
                required
                as="textarea"
                maxLength={150}
                name="subTitle"
                id="subTitle"
                value={subTitle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="category">Category</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setCategory(e.target.value);
                  handleLocalStorageSet(e);
                }}
                required
                // defaultValue={category}
                name="category"
                id="category"
                value={category}
              >
                {cats.map((x, i) => {
                  return <option key={i}>{x}</option>;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="markdown">Full Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g  # How to make Ice-cream at Home"
                onChange={(e) => {
                  setMarkdown(e.target.value);
                  handleLocalStorageSet(e);
                }}
                required
                as="textarea"
                name="markdown"
                id="markdown"
                value={markdown}
              />
            </Form.Group>
            <div className="flex-it">
              <Button variant="outline-primary" type="submit" size="lg">
                Submit
              </Button>
              <Button variant="info" type="button" onClick={previewHandler}>
                Preview
              </Button>

              <Button
                variant="danger"
                type="reset"
                onClick={resetLocalStorage}
                size="sm"
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default CreatePost;
