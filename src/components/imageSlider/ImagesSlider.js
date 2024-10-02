import React, { useEffect, useState } from "react";
import { Carousel, Image } from "antd";
import "./ImagesSlider.css";

function SlideImages() {
  let [images, setImages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/images")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <>
      <Carousel className="carousel" arrows infinite>
        {images.map((image) => {
          console.log(image["url"]);
          console.log("=============");
          return (
            <div
              key={image["id"]}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Image
                className="content"
                src={image["url"]}
                alt={image["url"]}
              />
            </div>
          );
        })}
      </Carousel>
    </>
  );
}

export default SlideImages;
