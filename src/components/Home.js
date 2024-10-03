import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./navBar/NavBar";
import SlideImages from "./imageSlider/ImagesSlider";

const Home = () => {
  const location = useLocation();
  const { data } = location.state || {}; // Retrieve the data passed via state
  // Safely access adminView and userId
  const adminView = data?.adminView ?? false; // Default to false if undefined
  const userId = data?.userId;

  return (
    <>
      <NavBar admin={adminView} home={true} userId={userId}></NavBar>
      <SlideImages></SlideImages>
    </>
  );
};
export default Home;
