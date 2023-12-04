import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import client from '../../api/client';
import { getToken, removeToken } from '../../util/jwt';

const MyBlogs = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [messages] = useState([]);
  const [userName, setUserName] = useState('unknown')
  const [blogs, setBlogs] = useState([]);
  const userProfileImageUrl = 'https://e7.pngegg.com/pngimages/136/22/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail.png';
  const handleLogout = () => {
    removeToken();
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = getToken()
        setUserIsAuthenticated(!!token);
        const responseInfo = await client.get('/accounts/user/');
        setUserName(responseInfo.data)
        // const response = await axios.get('blog/');
        const response = await client.get('/blog/');
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            setBlogs(response.data);
          } else {
            console.error('API response is not an array:', response.data);
          }
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchBlogs();
  }, []); 

  const deleteBlogPost = async (postId) => {
    try {
      const response = await client.delete(`/blog/${postId}/`);
      setBlogs(pre => pre.filter(blg => blg.id !== postId))
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteBlogPost(postId);
    }
  };
  
  
  

  return (
    <>
      <div className="container-fluid p-0">
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
                          {userName.first_name}
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
          {messages.length > 0 && (
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

          <h1 className="m-5 text-center">MY BLOGS</h1>
          <hr />
          <div className="row">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="blog_card">
                    <div className="blog_card_image">
                      <img src={blog.image} height="185px" alt="" />
                    </div>
                    <div className="blog_card_content">
                      <h3>{blog.title}</h3>
                      <p>{blog.content.slice(0, 50)}</p>
                    </div>
                    <div className="blog_date">
                      <p>
                        <Link
                          to={`/editblog/${blog.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          Edit
                        </Link>
                      </p>
                      <p>
                        <a
                          onClick={() => handleDelete(blog.id)}
                          style={{
                            textDecoration: 'none',
                            color: 'red',
                          }}
                        >
                          Delete
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-lg-4 col-md-6 col-sm-12">
                <h3>You have no Blog at this time.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 News Blog. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default MyBlogs;
