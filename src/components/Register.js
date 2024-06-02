import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser, findUser } from "./data/repository";
import registerImage from "../images/register.jpg";

function Registration(props) {
  const [fields, setFields] = useState({
    username: "",
    firstname: "",
    phone: 1234567890,
    email: "", // Added email field
    password: "",
    confirmPassword: ""
  });

  const [newfields, setnewFields] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    joinDate: new Date('')
  });

  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setnewFields({
      username: fields.username,
      email: fields.email,
      password: fields.password,
      phone: fields.phone,
      joinDate: new Date()
    });
  }, [fields]);

  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { trimmedFields, isValid } = handleValidation();
    if (!isValid) return;

    try {
      const user = await createUser(newfields);
      if (user) {
        props.loginUser(newfields);
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleValidation = () => {
    const trimmedFields = trimFields();
    const currentErrors = {};

    for (const [key, value] of Object.entries(trimmedFields)) {
      switch (key) {
        case "username":
          if (value.length === 0) {
            currentErrors[key] = "Username is required.";
          } else if (value.length > 32) {
            currentErrors[key] = "Username length cannot be greater than 32.";
          }
          break;
        case "firstname":
          if (value.length === 0) {
            currentErrors[key] = "First name is required.";
          } else if (value.length > 40) {
            currentErrors[key] = "First name length cannot be greater than 40.";
          }
          break;
        case "email":
          if (value.length === 0) {
            currentErrors[key] = "Email is required.";
          } else if (!validateEmail(value)) {
            currentErrors[key] = "Invalid email format.";
          }
          break;
        case "password":
          if (value.length === 0) {
            currentErrors[key] = "Password is required.";
          } else if (value.length < 6) {
            currentErrors[key] = "Password must contain at least 6 characters.";
          }
          break;
        case "confirmPassword":
          if (value !== trimmedFields.password) {
            currentErrors[key] = "Passwords do not match.";
          }
          break;
        default:
          break;
      }
    }

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimFields = () => {
    const trimmedFields = {};
    for (const [key, value] of Object.entries(fields)) {
      trimmedFields[key] = value.trim();
    }
    setFields(trimmedFields);
    return trimmedFields;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <style>
        {`
          body {
            background-image: url(${registerImage});
            background-size: cover;
            background-position: center;
            font-family: sans-serif;
          }
        `}
      </style>
      <div className="container dark-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <h3 className="card-title text-center mb-4 text-white">Register</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="text-white">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={fields.username}
                      onChange={handleInputChange}
                    />
                    {errors.username && <Alert variant="danger">{errors.username}</Alert>}
                  </div>

                  <div className="form-group">
                    <label className="text-white">Name</label>
                    <input
                      type="text"
                      name="firstname"
                      className="form-control"
                      value={fields.firstname}
                      onChange={handleInputChange}
                    />
                    {errors.firstname && <Alert variant="danger">{errors.firstname}</Alert>}
                  </div>

                  <div className="form-group">
                    <label className="text-white">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={fields.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && <Alert variant="danger">{errors.phone}</Alert>}
                  </div>

                  <div className="form-group">
                    <label className="text-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={fields.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <Alert variant="danger">{errors.email}</Alert>}
                  </div>

                  <div className="form-group">
                    <label className="text-white">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={fields.password}
                      onChange={handleInputChange}
                    />
                    {errors.password && <Alert variant="danger">{errors.password}</Alert>}
                  </div>

                  <div className="form-group">
                    <label className="text-white">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      value={fields.confirmPassword}
                      onChange={handleInputChange}
                    />
                    {errors.confirmPassword && <Alert variant="danger">{errors.confirmPassword}</Alert>}
                  </div>

                  <div className="form-group mt-3">
                    <button type="submit" className="btn btn-dark btn-lg btn-block">
                      Register
                    </button>
                  </div>

                  {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                  {registrationSuccess && (
                    <Alert variant="success" className="mt-3">
                      Registration successful! Redirecting to home page...
                    </Alert>
                  )}

                  <p className="text-white text-center mt-3">
                    Already a member? <a href="/login">Sign in</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
