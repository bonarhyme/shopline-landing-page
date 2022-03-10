import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editPost, getPost } from "../actions/posts";
import { EDIT_POST_RESET, GET_POST_RESET } from "../constants/posts";
import Loader from "./Loader";
import Message from "./Message";
import Preview from "./PreviewEdit";
import { appData } from "../variables/data";

const cats = appData.categories;
const EditPost = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [coverImage, setCoverImage] = useState("");
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [category, setCategory] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [preview, setPreview] = useState(false);
  const [_id, set_Id] = useState("");
  const slug = router.query.slug;

  const { loading, success, serverReply, error } = useSelector(
    (store) => store.postEdit
  );
  const {
    loading: gLoading,
    success: gSuccess,
    serverReply: gServerReply,
    error: gError,
  } = useSelector((store) => store.postGet);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editPost(coverImage, title, markdown, category, subTitle, _id));
  };

  // Handle get post
  useEffect(() => {
    dispatch(getPost(slug));
  }, [slug, dispatch]);

  //   Handle redirect if an invalid slug is passed
  useEffect(() => {
    if (gError) {
      router.push("/");
    }
  }, [gError, router]);

  // Check post
  useEffect(() => {
    if (gSuccess) {
      const { title, markdown, subTitle, coverImage, category, _id } =
        gServerReply?.data?.response;

      setTitle(title);
      setMarkdown(markdown);
      setSubTitle(subTitle);
      setCoverImage(coverImage);
      setCategory(category);
      set_Id(_id);
    }
  }, [gSuccess, gServerReply, slug]);

  useEffect(() => {
    if (success) {
      router.push("/post/" + serverReply?.data?.updatedPost?.slug);

      setCategory("");
      setCoverImage("");
      setTitle("");
      setSubTitle("");
      setMarkdown("");
      dispatch({ type: EDIT_POST_RESET });
      dispatch({ type: GET_POST_RESET });
    }
  }, [success, router, serverReply, dispatch]);

  const previewHandler = () => {
    setPreview((prev) => !prev);
  };

  return (
    <>
      {preview ? (
        <Preview
          coverImage={gServerReply?.data?.response?.coverImage}
          subTitle={subTitle}
          title={title}
          category={category}
          markdown={markdown}
          onClick={previewHandler}
        />
      ) : (
        <div className="create py-5">
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            {coverImage && (
              <Image
                src={coverImage}
                alt=""
                width={600}
                height={600}
                objectFit="contain"
              />
            )}
          </div> */}
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
            {/* <Form.Group>
              <Form.Label>Cover Image</Form.Label>

              <Form.Control
                type="file"
                accept="/image/*"
                onChange={(e) => {
                  setCoverImage(e.target.files[0]);
                  // handleLocalStorageSet(e);
                }}
                required
                autoFocus
                name="coverImage"
                id="coverImage"
                // value={coverImage}
              />
            </Form.Group> */}
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g How to make your own ice cream at home"
                onChange={(e) => {
                  setTitle(e.target.value);
                  //   handleLocalStorageSet(e);
                }}
                required
                name="title"
                value={title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sub Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g Ice creams are essential for every homes. In this post we learn how to make..."
                onChange={(e) => {
                  setSubTitle(e.target.value);
                  //   handleLocalStorageSet(e);
                }}
                required
                as="textarea"
                maxLength={150}
                name="subTitle"
                value={subTitle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setCategory(e.target.value);
                  //   handleLocalStorageSet(e);
                }}
                required
                // defaultValue={category}
                name="category"
                value={category}
              >
                {cats.map((x, i) => {
                  return <option key={i}>{x}</option>;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g  # How to make Ice-cream at Home"
                onChange={(e) => {
                  setMarkdown(e.target.value);
                  //   handleLocalStorageSet(e);
                }}
                required
                as="textarea"
                name="markdown"
                value={markdown}
              />
            </Form.Group>
            <div className="flex-it">
              <Button type="submit" size="lg">
                Submit
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={previewHandler}
              >
                Preview
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditPost;
