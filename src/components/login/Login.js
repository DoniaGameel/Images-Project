import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Spin } from "antd";
import { showErrorToast } from "../general/ToastHelper";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  let [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersResponse = await fetch("http://localhost:4000/users");
        const users = await usersResponse.json();
        setUsers(users); // Set the state with the users data
        setLoading(false);
      } catch (error) {
        //setLoading(false);
        console.error("Error fetching data:", error);
        showErrorToast("Error Loading Users Data");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (values) => {
    let id = 0;
    const isAuthenticated = users.some((user) => {
      if (
        user.username === values.username &&
        user.password === values.password
      ) {
        id = user.id; // Assign the matched user's id
        return true; // Return true if a match is found
      }
      return false; // Return false if no match is found
    });
    if (isAuthenticated) {
      const dataToSend = { userId: id };
      navigate("/uploadImages", { state: { data: dataToSend } });
    } else {
      showErrorToast("Invalid user name or password");
    }
  };
  return isLoading ? (
    <Spin></Spin>
  ) : (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" className="submit-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Login;
