import Image from "next/image";
import React from "react";

const Slide = ({ image, description, name, hide, className }) => {
  return (
    <article className={`${className} slide ${hide && "hide-slider-xs"}`}>
      <div className="image-container">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          objectFit="cover"
          className="slider-image"
        />
        <p className="slide-name">{name}</p>
      </div>
      <q className="slide-text">{description}</q>
    </article>
  );
};

export default Slide;
