import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import "./NavBar.css";
const { Header } = Layout;

const NavBar = () => {
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link className="nav-link active" aria-current="page" to="/login">
          Login
        </Link>
      </Header>
    </Layout>
  );
};
export default NavBar;
