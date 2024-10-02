import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/Login";
import "./App.css";
import UploadImages from "./components/uploadImages/UploadImages";

const AppWrapper = ({ children }) => {
  const location = useLocation();
  // Conditionally add class when the route is '/login'
  const wrapperClass =
    location.pathname === "/login" ? "login-wrapper" : "home-wrapper";

  return <div className={wrapperClass}>{children}</div>;
};

const App = () => (
  <Router>
    <AppWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uploadImages" element={<UploadImages />} />
      </Routes>
    </AppWrapper>
  </Router>
);
export default App;
