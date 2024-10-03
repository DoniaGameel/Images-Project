import React, { useEffect, useState } from "react";
import "./ImagesSlider.css";
import CarouselComponent from "../general/CarouselComponent";
import { showErrorToast } from "../general/ToastHelper";
import { Spin } from "antd";

function SlideImages() {
  let [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const imagesResponse = await fetch("http://localhost:4000/images");
        const images = await imagesResponse.json();
        setImages(images);
        setLoading(false);
      } catch (error) {
        //setLoading(false);
        console.error("Error fetching data:", error);
        showErrorToast("Error Loading Images");
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Spin></Spin>
  ) : (
    <CarouselComponent images={images}></CarouselComponent>
  );
}

export default SlideImages;
