import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CarouselComponent from "../general/CarouselComponent";
import { showErrorToast } from "../general/ToastHelper";

function UploadImages() {
  const location = useLocation();
  const { data } = location.state || {}; // Retrieve the data passed via state
  const [userImages, setUserImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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
        userID: data["userId"].toString(),
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
        message.success("Upload successful!"); // Notify on success
        console.log("Success", data);
      } catch (err) {
        console.log("Error", err);
        message.error("Upload failed!");
      }
    };

    reader.readAsDataURL(selectedFile); // Read the file as a data URL
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesResponse = await fetch("http://localhost:4000/images");
        const images = await imagesResponse.json();
        // Filter images based on the associated IDs
        const associatedImages = images.filter(
          (image) => image.userId === data["userId"].toString()
        );

        setUserImages(associatedImages); // Set the state with the user's images
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [data]);

  return (
    <>
      <Upload
        accept="image/*"
        showUploadList={false} // Hide the default upload list
        beforeUpload={(file) => {
          handleFileChange(file); // Handle file change
          return false; // Prevent automatic upload
        }}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button type="primary" onClick={handleUpload} style={{ marginTop: 16 }}>
        Upload
      </Button>
      <CarouselComponent images={userImages}></CarouselComponent>
    </>
  );
}

export default UploadImages;
