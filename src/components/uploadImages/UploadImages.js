import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CarouselComponent from "../general/CarouselComponent";

function UploadImages() {
  const location = useLocation();
  const { data } = location.state || {}; // Retrieve the data passed via state
  const [userImages, setUserImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data from db.json
        const usersResponse = await fetch("http://localhost:4000/users");
        const users = await usersResponse.json();

        const imagesResponse = await fetch("http://localhost:4000/images");
        const images = await imagesResponse.json();

        // Find the user by id
        const user = users.find(
          (user) => user.id === data["userId"].toString()
        );

        if (user) {
          // Get image IDs associated with the user
          const associatedImageIds = user.images_list_ids;

          // Filter images based on the associated IDs
          const associatedImages = images.filter((image) =>
            associatedImageIds.includes(image.id)
          );

          setUserImages(associatedImages); // Set the state with the user's images
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  return <CarouselComponent images={userImages}></CarouselComponent>;
}

export default UploadImages;
