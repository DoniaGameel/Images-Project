import React, { useEffect, useState } from "react";
import "./ImagesSlider.css";
import CarouselComponent from "../general/CarouselComponent";

function SlideImages() {
  let [images, setImages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/images")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return <CarouselComponent images={images}></CarouselComponent>;
}

export default SlideImages;
