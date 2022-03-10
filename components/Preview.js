import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import {
  FaArrowLeft,
  FaCalendar,
  FaEye,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Markdown from "./Markdown";
import Message from "./Message";

const Preview = ({
  title,
  subTitle,
  poster,
  uniqueViews = 0,
  likes = 0,
  createdAt = Date.now(),
  updatedAt = Date.now(),
  coverImage,
  category,
  markdown,
  onClick,
}) => {
  const { posterInfo } = useSelector((store) => store.posterProfileGet);
  return (
    <main>
      <article>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="border border-info">
            <p className="text-info text-center" style={{ fontSize: "2rem" }}>
              THIS A PREVIEW PAGE. GO BACK TO WRITE BY CLICKING ARROW!
            </p>
            <FaArrowLeft size={50} onClick={onClick} className="cursor" />
          </div>
          <h1 className="main-header-2 text-center">{title}</h1>
          <p className="text-muted text-center">
            {subTitle || "some placeholder text"}
          </p>
          <p className="text-center">#{category}</p>
          <div className="text-center meta pb-5">
            <span className="text-warning">
              <FaUser />
              <span className="px-2">
                {poster ? poster?.username : posterInfo?.data?.username}
              </span>
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
          </div>
          <div className="center-article pb-5">
            {typeof coverImage !== String ? (
              <Image
                src={coverImage && URL.createObjectURL(coverImage)}
                width={600}
                height={600}
                alt={title}
                objectFit="cover"
              />
            ) : coverImage !== "" ? (
              <Image
                src={coverImage}
                width={600}
                height={600}
                alt={title}
                objectFit="cover"
              />
            ) : (
              <Message variant="danger">
                Please select / re-select a cover image
              </Message>
            )}
          </div>

          <Markdown markdown={markdown} />
        </Container>
      </article>
    </main>
  );
};

export default Preview;
