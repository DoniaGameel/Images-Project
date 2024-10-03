import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Upload, Button, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CarouselComponent from "../general/CarouselComponent";
import { showErrorToast, showSuccessToast } from "../general/ToastHelper";
import "./UploadImages.css";
import NavBar from "../navBar/NavBar";
function UploadImages() {
  const location = useLocation();
  const { data } = location.state || {}; // Retrieve the data passed via state
  const [userImages, setUserImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showErrorToast("Please select a file first.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result; // Base64 string of the image
      const imageData = {
        id: new Date().getTime().toString(), // Generate a unique ID
        url: base64String,
        userId: data["userId"].toString(),
      };

      try {
        const response = await fetch("http://localhost:4000/images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        showSuccessToast("Upload successful!"); // Notify on success
        console.log("Success", data);
        // Update userImages by creating a new array and appending the new image
        setUserImages((prevImages) => [...prevImages, imageData]);
      } catch (err) {
        console.log("Error", err);
        showErrorToast("Upload failed!");
      }
    };

    reader.readAsDataURL(selectedFile); // Read the file as a data URL
    setSelectedFile(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const imagesResponse = await fetch("http://localhost:4000/images");
        const images = await imagesResponse.json();
        // Filter images based on the associated IDs
        const associatedImages = images.filter(
          (image) => image.userId === data["userId"].toString()
        );

        setUserImages(associatedImages); // Set the state with the user's images
        setLoading(false);
      } catch (error) {
        //setLoading(false);
        console.error("Error fetching data:", error);
        showErrorToast("Error Loading Images");
      }
    };
    fetchData();
  }, [data]);

  return isLoading ? (
    <Spin></Spin>
  ) : (
    <>
      <NavBar
        admin={true}
        home={false}
        userId={data["userId"].toString()}
      ></NavBar>
      <Upload
        accept="image/*"
        showUploadList={true} // Hide the default upload list
        maxCount={1}
        beforeUpload={(file) => {
          handleFileChange(file); // Handle file change
          return false; // Prevent automatic upload
        }}
      >
        <Button icon={<UploadOutlined />} style={{ marginTop: 30 }}>
          Select File
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        style={{ marginTop: 16, marginLeft: 16 }}
      >
        Upload
      </Button>
      <p>Please upload high resolution large images (Laptop Backgrounds)</p>
      <CarouselComponent images={userImages} admin={true}></CarouselComponent>
    </>
  );
}

export default UploadImages;
