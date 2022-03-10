import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";

const EditButton = ({ slug }) => {
  const router = useRouter();
  const handleEdit = (slug) => {
    router.push("/post/edit/" + slug);
  };
  return (
    <>
      <Button variant="info" size="sm" onClick={() => handleEdit(slug)}>
        Edit
      </Button>
    </>
  );
};

export default EditButton;
