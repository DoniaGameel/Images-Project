import React, { useEffect, useState } from "react";

const UploadedImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.log("Error fetching images", err));
  }, []);

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <div key={image.id} style={{ margin: "10px" }}>
            <img
              src={image.url} // Base64 string
              alt={`Uploaded ${image.id}`}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedImages;
