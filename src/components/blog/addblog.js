import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/accounts.css';
import client from '../../api/client';
import { getToken, removeToken } from '../../util/jwt';

const AddBlog = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate()

  const [messages, setMessages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [formImage, setFormImage] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');

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
    const fetchCategories = async () => {
      try {
        const response = await client.get('/blog/categories/');
        const data = response.data
        setCategories(data);
        if (data)
          setCategory(data[0].id)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchUser()
    fetchCategories()
  }, []);

  const handleLogout = () => {
    removeToken()
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', formImage);
      formData.append('title', formTitle);
      formData.append('content', formContent);
      formData.append('category', category);
      const response = await client.post('/blog/', formData);
      setFormImage(null);
      setFormTitle('');
      setFormContent('');
      navigate("/myblogs")
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const userProfileImageUrl = 'https://e7.pngegg.com/pngimages/136/22/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail.png';

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

      <div className="container blog_container">
        <h1 className="m-3 text-center">ADD BLOG</h1>
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
        <hr className="mb-3" />
        <div className="row mb-5">
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <input
              type="file"
              className="form-control mb-3"
              onChange={(e) => setFormImage(e.target.files[0])}
              required
            />
            <input
              type="text"
              className="form-control mb-3"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Enter title..."
              required
            />
            <textarea
              className="form-control mb-3"
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              rows="5"
              placeholder="Blog Content"
              required
            ></textarea>
            <select name="category" className="form-select mb-3" required onChange={e=> setCategory(e.target.value)}>
              {categories.map(cat => <option value={cat.id}>{cat.name}</option>)}
            </select>
            <button type="submit" className="btn btn-primary w-100">
              Add Blog
            </button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 News Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AddBlog;
