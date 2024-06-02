import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyUser } from "./data/repository";
import "./Login.css";
import profileImage from "../images/profile.jpg";
import { Alert, Button, Form } from "react-bootstrap";

export default function Login(props) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await verifyUser(fields.username, fields.password);

      if (!user) {
        // Login failed, reset password field to blank and set error message.
        setFields({ ...fields, password: "" });
        setErrorMessage("Username and/or password invalid, please try again.");
        return;
      }

      // Set user state.
      props.loginUser(user);

      // Navigate to the home page.
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div>
      <style>
        {`
          body {
            background-image: url(${profileImage});
            background-size: cover;
            background-position: center;
          }
        `}
      </style>
      <div className="container1">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Log In</h3>
                <Form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="text-black">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter username"
                      name="username"
                      value={fields.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-black">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      value={fields.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <Button variant="dark" type="submit" className="btn-lg btn-block">
                      Login
                    </Button>
                  </div>

                  {errorMessage && (
                    <Alert variant="danger" className="mt-3">
                      {errorMessage}
                    </Alert>
                  )}
                </Form>
              </div>

              <div className="card-footer">
                <p className="text-white mb-0">Not a member? <Link to="/register">Join now</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
