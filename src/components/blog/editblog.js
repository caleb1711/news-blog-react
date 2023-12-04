import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import client from '../../api/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/accounts.css';
import { getToken, removeToken } from '../../util/jwt';


const EditBlog = () => {
  
  const { id } = useParams();
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate()
  const [messages, setMessages] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const userProfileImageUrl = 'https://e7.pngegg.com/pngimages/136/22/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail.png';
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await client.get('/accounts/user/');
        const token = getToken()
        setUserIsAuthenticated(!!token)

        console.log('the data of ', response.data)
        const { userFirstName, messages } = response.data;
        setUserData(response.data);
        setMessages(messages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        setUserIsAuthenticated(!!token);

        const response = await client.get(`/blog/${id}/`);
        console.log('the data of ', response.data)
        setTitle(response.data.title);
        setContent(response.data.content);
        const { userFirstName, messages } = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    fetchUser();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('content', content);

      const response = await client.patch(`/blog/${id}/`, formData);

      setImage(null);
      setTitle('');
      setContent('');

      console.log('Form submitted successfully:', response.data);
      navigate("/myblogs")
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container-fluid p-0">
       {/* Header section */}
       <div className="main_header dashboard_header">
        <div className="container main_header_container">
          <div className="main_header_text">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h4>News</h4>
              <p>Blog</p>
            </Link>
          </div>

          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  {userIsAuthenticated ? (
                    <>
                      <li className="nav-item">
                        <Link to="/myblogs" className="nav-link">
                          My Blogs
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/addblog" className="nav-link">
                          Add Blog
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/login" className="nav-link">
                          Log Out
                        </Link>
                      </li>
                      <li className="nav-link">
                          <img 
                          src={userProfileImageUrl}
                          alt="User Profile"
                          className="navbar-profile-image" 
                          onClick={handleLogout}
                          /> 
                          {userData.first_name}
                      </li>
                      
                    </>
                  ) : (
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>



      {/* Main content section */}
      <div className="container blog_container">
        <h1 className="m-3 text-center">Edit BLOG</h1>

        {messages && messages.length > 0 && (
          <div>
            {messages.map((message, index) => (
              <div
                key={index}
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                {message}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            ))}
          </div>
        )}

        {formErrors.length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {formErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Form section */}
        <hr className="mb-3" />
        <div className="row mb-5">
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            {/* Image input */}
            <div className="form-group mb-3">
              <label htmlFor="inputAddress2">Title</label>
              <input
                type="file"
                className="form-control"
                name="image"
                id="inputAddress2"
                placeholder="Enter Blog Image..."
                onChange={(e) => setImage(e.target.files[0])}
                
              />
            </div>

            {/* Title input */}
            <div className="form-group mb-3">
              <label htmlFor="inputAddress2">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                required
              />
            </div>

            {/* Content input */}
            <div className="form-group mb-3">
              <label htmlFor="exampleFormControlTextarea1">Blog Content</label>
              <textarea
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="5"
                placeholder="Enter Blog Content..."
                required
              ></textarea>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary w-100">
              Edit Blog
            </button>
          </form>
        </div>
      </div>

      {/* Footer section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 News Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EditBlog;
