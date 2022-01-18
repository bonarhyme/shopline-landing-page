import React, { useEffect, useState } from "react";
import Slide from "./Slide";
import { sliderData } from "./slider-data";

const MySlider = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(sliderData.length - 1);
  const [nextIndex, setNextIndex] = useState(index + 1);

  function changePrev(currentIndex) {
    if (currentIndex === 0) {
      setPrevIndex(sliderData.length - 1);
    } else {
      setPrevIndex(currentIndex - 1);
    }
  }

  function changeNext(currentIndex) {
    if (currentIndex === sliderData.length - 1) {
      setNextIndex(0);
    } else {
      setNextIndex(currentIndex + 1);
    }
  }

  const handleNext = () => {
    if (index === 0) {
      setIndex(sliderData.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  const handlePrev = () => {
    if (index === sliderData.length - 1) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    changePrev(index);
    changeNext(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div>
      <Slide
        description={sliderData[prevIndex].text}
        image={sliderData[prevIndex].image}
        name={sliderData[prevIndex].name}
      />
      <div>
        <button onClick={handlePrev}>Prev</button>
        <Slide
          description={sliderData[index].text}
          image={sliderData[index].image}
          name={sliderData[index].name}
        />
        <button onClick={handleNext}>Next</button>
      </div>
      <Slide
        description={sliderData[nextIndex].text}
        image={sliderData[nextIndex].image}
        name={sliderData[nextIndex].name}
      />
    </div>
  );
};

export default MySlider;
