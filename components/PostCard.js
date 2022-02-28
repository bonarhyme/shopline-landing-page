import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import face from "../images/face1.jpg";

const Post = ({ post, hide = false, center = false }) => {
  const [cat, setCat] = useState("");
  const [cov, setCov] = useState("");
  const [slu, setSlu] = useState("");
  const [tit, setTit] = useState("");
  const [sub, setSub] = useState("");

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (post) {
        setCat(post.category);
        setCov(post.coverImage);
        setSlu(post.slug);
        setTit(post.title);
        setSub(post.subTitle);
      }
    }
    return () => (isMounted = false);
  }, [post]);

  return (
    <>
      {cov ? (
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className={`${center && "center"} ${hide && "hide-slider-xs"} mb-2`}
        >
          <Link href={`/post/${slu}`} passHref>
            <Card
              style={{
                width: "18rem",
                height: "15rem",
                borderRadius: "30px",
                cursor: "pointer",
              }}
            >
              <Image
                src={face}
                alt={tit}
                className="card-img-top br"
                width={300}
                height={300}
                objectFit="cover"
              />

              <Card.Body>
                <Card.Title className="trim small">{tit}</Card.Title>
                {/* <Card.Text className="trim">{sub}</Card.Text>
              <Card.Text className="text-success">#{cat}</Card.Text>
              <Link href={`/post/${slu}`} passHref>
              <Button variant="success">Read more</Button>
            </Link> */}
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ) : (
        <Loader width="30px" height="30px" />
      )}
    </>
  );
};

export default Post;
