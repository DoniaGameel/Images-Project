import { Carousel, Image } from "antd";
import React, { useEffect, useState } from "react";

function CarouselComponent(props) {
  let [images, setImages] = useState([]);
  useEffect(() => {
    setImages(props.images);
  }, [props.images]);
  return (
    <Carousel className="carousel" arrows infinite>
      {images.map((image) => {
        return (
          <div
            key={image["id"]}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Image className="content" src={image["url"]} alt={image["url"]} />
          </div>
        );
      })}
    </Carousel>
  );
}

export default CarouselComponent;
