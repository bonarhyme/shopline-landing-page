import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { approvePost, deletePost, getAllPosts } from "../actions/posts";
import EditButton from "./EditButton";
// import EditButton from "./EditButton";
import Loader from "./Loader";
import Message from "./Message";
import Pagination from "./Pagination";

const AdminPostsList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(null);
  const [pages, setPages] = useState(null);
  const [keyword, setKeyword] = useState("");

  const { loading, success, serverReply, error } = useSelector(
    (store) => store.postsAllGet
  );
  const {
    loading: aLoading,
    success: aSuccess,
    serverReply: aServerReply,
    error: aError,
  } = useSelector((store) => store.postApprove);
  const {
    loading: dLoading,
    success: dSuccess,
    serverReply: dServerReply,
    error: dError,
  } = useSelector((store) => store.postDelete);

  useEffect(() => {
    dispatch(getAllPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aSuccess, dSuccess]);

  useEffect(() => {
    if (serverReply) {
      // console.log(serverReply.data);
      setPostList(serverReply?.data?.allPosts);
      setPage(serverReply?.data?.page);
      setPages(serverReply?.data?.pages);
    }
  }, [success, serverReply]);

  const handlePage = (thePage) => {
    dispatch(getAllPosts(thePage, "", ""));
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

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getAllPosts("", "", keyword));
  };

  const handleApprove = (postId) => {
    if (window.confirm("Are you sure you want to approve this post?")) {
      dispatch(approvePost(postId));
    }
  };
  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId));
    }
  };

  return (
    <div className="my-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-center py-2">Posts</h3>
          {error && <Message variant="danger">{error}</Message>}
          {aError && <Message variant="danger">{aError}</Message>}
          {dError && <Message variant="danger">{dError}</Message>}
          <Link href="/poster/create" passHref>
            <Button variant="outline-primary" size="lg">
              Create New POST
            </Button>
          </Link>
          <div className="my-3">
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
          </div>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Cover Image</th>
                <th>Title</th>
                <th>Poster</th>
                <th>Status</th>
                <th>Read</th>
                <th>Views</th>
                <th>Likes</th>
                <th>Approve</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {postList.length > 0 &&
                postList.map((x, i) => {
                  const {
                    category,
                    coverImage,
                    title,
                    poster,
                    isActive,
                    uniqueViewsCount,
                    likesCount,
                    _id,
                    slug,
                  } = x;

                  return (
                    <tr key={_id}>
                      <td>{i + 1}</td>
                      <td>{category}</td>
                      <td>
                        <Image
                          src={coverImage}
                          width={100}
                          height={100}
                          objectFit="cover"
                          alt={title}
                        />
                      </td>
                      <td>{title}</td>
                      <td>{poster.username}</td>

                      <td>
                        {isActive ? (
                          <FaCheck color="green" />
                        ) : (
                          <FaTimes color="red" />
                        )}
                      </td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() => router.push("/post/" + slug)}
                        >
                          Read
                        </Button>
                      </td>
                      <td>{uniqueViewsCount}</td>
                      <td>{likesCount}</td>
                      <td>
                        {aLoading ? (
                          <Loader width="30px" height="30px" />
                        ) : isActive ? (
                          <FaCheck color="green" />
                        ) : (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleApprove(_id)}
                          >
                            Approve
                          </Button>
                        )}
                      </td>
                      <td>
                        <EditButton slug={slug} />
                      </td>
                      <td>
                        {dLoading ? (
                          <Loader width="30px" height="30px" />
                        ) : (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(_id)}
                          >
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <div className="my-3">
            <Pagination
              page={page}
              pages={pages}
              onClick={handlePage}
              prevHandler={() => prevHandler(page)}
              nextHandler={() => nextHandler(page, pages)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPostsList;
