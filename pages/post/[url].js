import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { appData } from "../../variables/data";
import { Button, Container, Form } from "react-bootstrap";
// import FourZeroFour from "../404";
import Image from "next/image";
import { FaEye, FaHeart, FaCalendar, FaUser, FaPen } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Markdown from "../../components/Markdown";
import { useSelector, useDispatch } from "react-redux";
import { handleLikeAction } from "../../actions/posts";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
// import { BlogSEO } from "../../components/SEO";
import Layout from "../../components/Layout";

const PostPage = ({ serverRes, errorMessage }) => {
  const errorT = errorMessage && errorMessage;
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [poster, setPoster] = useState({});
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [markdown, setMarkdown] = useState("");
  const [views, setViews] = useState(0);
  const [uniqueViews, setUniqueViews] = useState(0);
  const [userLikedPost, setUserLikedPost] = useState(false);
  const [userLiked, setUserLiked] = useState(userLikedPost);
  const [_id, set_Id] = useState("");
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");

  const [canEdit, setCanEdit] = useState(false);

  const router = useRouter();

  const { posterInfo } = useSelector((store) => store.posterProfileGet);

  const handleSubmitCommit = (e) => {
    e.preventDefault();
    dispatch(createComment(_id, comment, username));
  };

  const handleLike = () => {
    dispatch(handleLikeAction(_id));
  };

  useEffect(() => {
    if (posterInfo) {
      const { isAdmin, isEditor, isReporter } = posterInfo?.data;
      if (isAdmin || isEditor || isReporter) {
        setCanEdit(true);
      }
    }
  }, [posterInfo]);

  useEffect(() => {
    if (serverRes) {
      const {
        category: cat,
        coverImage: cov,
        createdAt: cre,
        poster: pos,
        slug: slu,
        title: tit,
        subTitle: sub,
        comments: com,
        likes: lik,
        markdown: mar,
        views: vie,
        uniqueViews: uni,
        userLikedPost: use,
        _id: id,

        updatedAt: upd,
      } = serverRes?.data?.response;

      setCategory(cat);
      setCoverImage(cov);
      setCreatedAt(cre);
      setPoster(pos);
      setTitle(tit);
      setSubTitle(sub);
      setLikes(lik);
      setMarkdown(mar);
      setViews(vie);
      setUniqueViews(uni);
      setUserLiked(use);
      set_Id(id);
      setUpdatedAt(upd);
      setSlug(slu);

      if (typeof window !== "undefined") {
        setUrl(window.location.href);
      }
    }
  }, [serverRes]);

  return (
    <Layout>
      {/* {!errorT && (
        <BlogSEO
          authorDetails={poster}
          date={createdAt}
          lastMod={updatedAt}
          subTitle={subTitle}
          title={title}
          url={url}
          images={[coverImage]}
        />
      )} */}
      <section className="py-5">
        {/* <textarea onChange={(e) => setText(e.target.value)} /> */}

        <Container>
          {errorT ? (
            <div>
              <Message variant="danger">{errorMessage}</Message>
              {/* <FourZeroFour text={errorMessage} /> */}
            </div>
          ) : (
            <article>
              {/* <Share
                hashtag={"#" + category}
                image={coverImage}
                title={title}
                url={typeof window !== "undefined" && window.location.href}
              /> */}
              <h1 className="main-header-2 text-center">{title}</h1>
              <p className="text-muted text-center">{subTitle}</p>
              <p className="text-center">#{category}</p>
              <div className="text-center meta pb-5">
                <span className="text-warning">
                  <FaUser />
                  <span className="px-2">{poster.username}</span>
                </span>
                <span>
                  <FaEye />
                  <b className="px-1 ">{uniqueViews}</b>
                </span>
                <span>
                  {" "}
                  <FaHeart color="#ffc107" />
                  <span className="px-2">{likes}</span>
                </span>

                <span>
                  {" "}
                  <FaCalendar />
                  <small className="px-2 text-muted">
                    {new Date(createdAt).toDateString()}
                  </small>
                </span>
                <span>
                  {" "}
                  Updated:
                  <small className="px-2 text-muted">
                    {new Date(updatedAt).toDateString()}
                  </small>
                </span>
                {/* {canEdit && <EditButton slug={slug} />} */}
              </div>
              <div className="center-article center-img pb-5">
                {coverImage && (
                  <Image
                    src={coverImage}
                    width={600}
                    height={600}
                    alt={title}
                    objectFit="cover"
                  />
                )}
              </div>

              <Markdown markdown={markdown} />
            </article>
          )}
        </Container>
      </section>
    </Layout>
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
