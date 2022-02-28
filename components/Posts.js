import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Form, Row } from "react-bootstrap";
import Post from "./PostCard";
import { appData } from "../variables/data";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import Pagination from "./Pagination";
import Message from "./Message";

const Posts = ({ serverRes }) => {
  // post from index
  const aIndex = serverRes?.data?.allPosts;
  const pIndex = serverRes?.data?.page;
  const psIndex = serverRes?.data?.pages;

  const [res, setRes] = useState(aIndex);
  const [page, setPage] = useState(pIndex);
  const [pages, setPages] = useState(psIndex);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ isExists: false, message: "" });
  const [keyword, setKeyword] = useState("");

  const router = useRouter();
  const asPath = router?.asPath?.split("&")[0];
  const fullQuery = router?.asPath;
  const pageQuery =
    fullQuery?.slice(0, fullQuery?.length - 1) || "/?category&pageNumber=";
  const category = router?.asPath?.split("=")[1]?.split("&")[0];

  // const pageNumber = router.asPath.split("=")[1].split("&")[1];
  // console.log({ asPath, category, pageNumber });

  const getPosts = async (path) => {
    try {
      setLoading(true);
      setError({ ...error, isExists: false });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `${appData.serverUrl}/post/get-all-posts`,
        config
      );

      setRes(data?.data?.allPosts);
      setPage(data?.data?.page);
      setPages(data?.data?.pages);
      setLoading(false);
    } catch (error) {
      const theError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setLoading(false);
      setError({ ...error, isExists: true, message: theError });
    }
  };
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getPosts(asPath);
    }
    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handlePage = (thePage) => {
    setPage(thePage);
    getPosts(pageQuery + thePage);
  };

  const prevHandler = (thePage) => {
    if (thePage === 1) {
      handlePage(1);
    } else {
      handlePage(Number(thePage) - 1);
    }
  };

  const nextHandler = (thePage, thePageLength) => {
    if (thePage < thePageLength) {
      handlePage(Number(thePage) + 1);
    }
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   getPosts("/?keyword=" + keyword);
  // };

  return (
    <Container fluid>
      <Row className="justify-content-center center gap py-5 my-5 ">
        {error.isExists ? (
          <Message variant="danger">{error.message}</Message>
        ) : loading ? (
          <Loader />
        ) : (
          <>
            {/* <div className="my-3 center">
              <Form
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  display: "flex",
                }}
                onSubmit={handleSearch}
              >
                <Form.Control
                  type="text"
                  placeholder="e.g Health benefits of fresh fruits"
                  className="mx-2"
                  onChange={(e) => setKeyword(e.target.value)}
                  required
                />
                <Button variant="outline-info" size="sm" type="submit">
                  Search
                </Button>
              </Form>
            </div> */}
            {res &&
              res.length > 0 &&
              res.map((post) => {
                const { _id } = post;

                return <Post key={_id} post={post} center />;
              })}
          </>
        )}

        {!error.isExists && (
          <Pagination
            page={page}
            pages={pages}
            onClick={handlePage}
            prevHandler={() => prevHandler(page)}
            nextHandler={() => nextHandler(page, pages)}
          />
        )}
      </Row>
    </Container>
  );
};

export default Posts;
