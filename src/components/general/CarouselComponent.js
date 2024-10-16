import { Carousel, Col, Image, Row, Spin } from "antd";
import { Button, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { showErrorToast, showSuccessToast } from "./ToastHelper";

function CarouselComponent(props) {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleDeleteImage = async (image) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:4000/images/${image["id"]}`, {
        method: "DELETE",
      });
      setImages((prevImages) =>
        prevImages.filter((img) => img["id"] !== image["id"])
      );
      showSuccessToast("Image Deleted!");
    } catch (error) {
      console.error("Error deleting image:", error);
      showErrorToast("Error Deleting The Image");
    } finally {
      setLoading(false); // Ensure loading is reset in the finally block
    }
  };

  useEffect(() => {
    setImages(props.images);
  }, [props.images]);

  return isLoading ? (
    <Spin />
  ) : (
    <Carousel
      className="carousel"
      arrows
      infinite
      autoplay
      autoplaySpeed={3000}
    >
      {images.map((image) => (
        <div
          key={image["id"]}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Row>
            <Col span={18}>
              <Image
                className="content"
                src={image["url"]}
                alt={image["url"]}
              />
            </Col>
            {props.admin && (
              <Col span={6}>
                <Popconfirm
                  title="Are you sure you want to delete this image?"
                  onConfirm={() => {
                    handleDeleteImage(image);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    color="danger"
                    variant="solid"
                    style={{ marginBottom: 15 }}
                  >
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              </Col>
            )}
          </Row>
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
