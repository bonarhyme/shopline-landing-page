import Image from "next/image";
import React from "react";

const Slide = ({ image, description, name }) => {
  return (
    <article>
      <div className="image-container">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          objectFit="contain"
        />
        <p>{name}</p>
      </div>
      <p>{description}</p>
    </article>
  );
};

export default Slide;
