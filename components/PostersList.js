import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { approvePoster, deletePoster, getAllPosters } from "../actions/poster";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FaCheck, FaTimes } from "react-icons/fa";

const Td = ({
  aLoading,
  handleAccept,
  disabled,
  _id,
  path = "",
  text = "Accept",
  variant = "outline-warning",
}) => {
  return (
    <td>
      {aLoading ? (
        <Loader />
      ) : (
        <Button
          variant={variant}
          size="sm"
          onClick={() => handleAccept(path, _id)}
          disabled={disabled && disabled}
        >
          {text}
        </Button>
      )}
    </td>
  );
};

const PostersList = () => {
  const dispatch = useDispatch();
  const [posters, setPosters] = useState([]);
  const { loading, sucess, posterInfo, error } = useSelector(
    (store) => store.postersAllGet
  );
  const {
    loading: aLoading,
    sucess: aSuccess,
    posterInfo: aPosterInfo,
    error: aError,
  } = useSelector((store) => store.posterApprove);
  const {
    loading: dLoading,
    sucess: dSuccess,
    posterInfo: dPosterInfo,
    error: dError,
  } = useSelector((store) => store.posterDelete);
  useEffect(() => {
    dispatch(getAllPosters());
  }, [dispatch, aSuccess, aPosterInfo, dPosterInfo]);

  useEffect(() => {
    if (posterInfo) {
      setPosters(posterInfo?.data?.allPosters);
    }
  }, [posterInfo]);

  const handleAccept = (path, posterId) => {
    if (window.confirm("Are you sure you want to perform this action?")) {
      dispatch(approvePoster(path, posterId));
    }
  };
  const handleDelete = (posterId) => {
    if (window.confirm("Are you sure you want to delete this poster?")) {
      dispatch(deletePoster(posterId));
    }
  };

  return (
    <div className="mb-5">
      {error ? (
        <></>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <h3 className="text-center py-2">Posters</h3>
              {aError && <Message variant="danger">{aError}</Message>}
              {dError && <Message variant="danger">{dError}</Message>}
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Accepted</th>

                    <th>Admin</th>
                    <th>Accept</th>

                    <th>Make Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {posters &&
                    posters.map((x, i) => {
                      const {
                        name,
                        email,
                        username,
                        isAccepted,

                        isAdmin,
                        _id,
                      } = x;

                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{name}</td>
                          <td>{email}</td>
                          <td>{username}</td>
                          <td>
                            {isAccepted ? (
                              <FaCheck color="green" />
                            ) : (
                              <FaTimes color="red" />
                            )}
                          </td>

                          <td>
                            {isAdmin ? (
                              <FaCheck color="green" />
                            ) : (
                              <FaTimes color="red" />
                            )}
                          </td>

                          <Td
                            aLoading={aLoading}
                            handleAccept={handleAccept}
                            disabled={isAccepted}
                            _id={_id}
                          />

                          {isAdmin ? (
                            <Td
                              _id={_id}
                              path="?isAdmin=false"
                              text="Demote"
                              aLoading={aLoading}
                              variant="outline-danger"
                              handleAccept={handleAccept}
                            />
                          ) : (
                            <Td
                              _id={_id}
                              path="?isAdmin=true"
                              text="Admin"
                              aLoading={aLoading}
                              handleAccept={handleAccept}
                            />
                          )}

                          <td>
                            {dLoading ? (
                              <Loader
                                height="30px"
                                width="30px"
                                display="inline-block"
                              />
                            ) : (
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(_id)}
                              >
                                Remove
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostersList;
