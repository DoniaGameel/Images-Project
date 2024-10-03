import React from "react";
import { Layout, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
const { Header } = Layout;

const NavBar = (props) => {
  const navigate = useNavigate();
  let redirectPath = props.admin ? "/" : "/login";

  const handleButtonClick = () => {
    let route = props.home ? "/uploadImages" : "/";
    const dataToSend = { adminView: true, userId: props.userId };
    navigate(route, { state: { data: dataToSend } });
  };
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {props.admin ? (
          <Button type="link" onClick={handleButtonClick}>
            {props.home ? "Admin View" : "Guest View"}
          </Button>
        ) : (
          <></>
        )}
        <Link className="nav-link active" aria-current="page" to={redirectPath}>
          {props.admin ? "Logout" : "Login"}
        </Link>
      </Header>
    </Layout>
  );
};
export default NavBar;
