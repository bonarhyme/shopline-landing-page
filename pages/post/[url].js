import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { appData } from "../../variables/data";
import { Button, Container, Form } from "react-bootstrap";
import Image from "next/image";
import { FaEye, FaHeart, FaCalendar, FaUser, FaPen } from "react-icons/fa";
import Markdown from "../../components/Markdown";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../components/Message";
import { BlogSEO } from "../../components/SEO";
import EditButton from "../../components/EditButton";
import Layout from "../../components/Layout";

const PostPage = ({ serverRes, errorMessage }) => {
  const errorT = errorMessage && errorMessage;
  const dispatch = useDispatch();
  const blog = serverRes?.data?.response;

  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  // const [userLiked, setUserLiked] = useState(false);

  const router = useRouter();

  const { posterInfo } = useSelector((store) => store.posterProfileGet);

  useEffect(() => {
    if (posterInfo) {
      const { isAdmin, isEditor, isReporter } = posterInfo?.data;
      if (isAdmin || isEditor || isReporter) {
        setCanEdit(true);
      }
    }
  }, [posterInfo]);

  return (
    <>
      <BlogSEO
        authorDetails={blog?.poster}
        date={blog?.createdAt}
        lastMod={blog?.updatedAt}
        subTitle={blog?.subTitle}
        title={blog?.title}
        url={blog?.url}
        image={blog?.coverImage}
        description={blog?.subTitle}
        ogImage={blog?.coverImage}
        ogType="website"
        twImage={blog?.coverImage}
      />
      <Layout>
        <main className="py-2">
          <Container>
            {errorT ? (
              <div>
                <Message variant="danger">
                  The post you are looking for does not exist.
                </Message>
              </div>
            ) : (
              <article>
                <h1 className="main-header-2 text-center">{blog?.title}</h1>
                <p className="text-muted text-center">{blog?.subTitle}</p>
                <p className="text-center">#{blog?.category}</p>
                <div className="text-center center-article meta pb-5">
                  <span className="text-warning">
                    <FaUser />
                    <span className="px-2">{blog?.poster.username}</span>
                  </span>

                  <span>
                    {" "}
                    <FaEye />
                    <span className="px-2">{blog?.views}</span>
                  </span>

                  <span>
                    {" "}
                    <FaCalendar />
                    <small className="px-2 text-muted">
                      {new Date(blog?.createdAt).toDateString()}
                    </small>
                  </span>
                  <span>
                    {" "}
                    Updated:
                    <small className="px-2 text-muted">
                      {new Date(blog?.updatedAt).toDateString()}
                    </small>
                  </span>
                  {canEdit && <EditButton slug={blog?.slug} />}
                </div>
                <div
                  className="center-article pb-5 "
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {blog?.coverImage && (
                    <Image
                      src={blog?.coverImage}
                      width={600}
                      height={600}
                      alt={blog?.title}
                      objectFit="cover"
                    />
                  )}
                </div>

                <Markdown markdown={blog?.markdown} />
              </article>
            )}
          </Container>
        </main>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  let serverRes = null;
  let errorMessage = null;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      appData.serverUrl + "/post/get-single-post/" + context.query.url,
      config
    );
    serverRes = data;
  } catch (error) {
    errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  }

  return {
    props: { serverRes, errorMessage },
  };
}

export default PostPage;
