import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profileImage from "../images/profile.jpg";


function Profile(props) {
  //const [userData, setUserData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();


  const handleEdit = () => {
    setEditMode(true);
    setEditData({
      username: props.user.username,
      email: props.user.email,
      phone: props.user.phone,
      joinDate: props.user.joinDate,
      password_hash: props.user.password_hash
    });
    setSuccessMessage("");
  };

  const handleDelete = async (username) => {
    if(!window.confirm(`Are you sure you want to delete User Name ${username} ?`))
      return;
    try {
      await axios.delete(`http://localhost:4000/api/users/${username}`);
      props.loginUser(null);
      setSuccessMessage("User deleted successfully.");
      navigate("/login");     
    } catch (error) {
      console.error("Error deleting user data:", error);
      //setSuccessMessage(v.data);
      setSuccessMessage(error.message);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    var v;
    try {
      v = await axios.put(`http://localhost:4000/api/users/${props.user.username}`, editData); // Replace with your actual update endpoint
      props.user.username = editData.username;
      props.user.email = editData.email;
      props.user.phone = editData.phone;
      setEditMode(false);
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      setSuccessMessage(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogout = () => {
    props.loginUser(null);
    navigate("/login");
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
      <div className="container-profile">
        <h2 className="mt-4">Profile</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {props.user ? (
          <div className="profile">
            {editMode ? (
              <div>
                <form onSubmit={handleSaveEdit}>
                  <div className="form-group">
                    <label>Username:</label>  
                    <input type="text" placeholder={props.user.username} className="form-control" name="username" value={editData.username} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" placeholder={props.user.email} className="form-control" name="email" value={editData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input type="tel" placeholder={props.user.phone} className="form-control" name="phone" value={editData.phone} onChange={handleChange} />
                  </div>
                  <div className="btn-group"> 
                    <button type="submit" className="btn btn-primary mr-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <p><strong>Username:</strong> {props.user.username}</p>
                <p><strong>Email:</strong> {props.user.email}</p>
                <p><strong>Phone:</strong> {props.user.phone}</p> 
                <p><strong>Date of Joining:</strong> {new Date(props.user.joinDate).toLocaleString()}</p>
                <div className="btn-group">
                  <button className="btn btn-primary mr-2" onClick={handleEdit}>Edit</button> 
                  <button className="btn btn-danger" onClick={() => handleDelete(props.user.username)}>Delete</button>
                </div>
              </div>
            )}
            <button className="btn btn-warning mt-3" onClick={handleLogout}>Logout</button>
          </div>  
        ) : (
          <div className="alert alert-warning">Please log in.</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
