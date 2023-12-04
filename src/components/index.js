import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaUserFriends } from 'react-icons/fa'; 

import './style/accounts.css';
import client from '../api/client';
import { getToken, removeToken } from '../util/jwt';


const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = getToken();

        setUserIsAuthenticated(!!token);
        const responseInfo = await client.get('/accounts/user/')
        setUserName(responseInfo.data)

        
      } catch (error) {
        console.log('Error details:', error.response.data);
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
    

    const fetchBlogs = async () => {
      try {
        const response = await client.get('/blog/public/'); 
        
        const updatedResponseData = response.data.map(blog => {
          return {
              ...blog,
              commentsCount: blog.comments.length 
          };
      });
      setBlogs(updatedResponseData);
        console.log(response.data)
      } 
      catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    const randomBlogs = generateRandomBlogs(6);
    setBlogs(randomBlogs);

    fetchBlogs();
  }, []);


    const [query, setQuery] = useState('');
  
    const handleSearch = async () => {
      try {
        const response = await client.get(`/blog/public/?search=${query}`);
        setBlogs(response.data);
        console.log("Search Blogs : ", query, response.data)
      } catch (error) {
        console.error('Error fetching search results:', error);
      }}
    

 const generateRandomBlogs = (count) => {
  const randomBlogs = [];
  for (let i = 1; i <= count; i++) {
    const randomBlog = {
      id: i,
      title: `Random Blog ${i}`,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Throughout this book, I’ll be referring to a lot of diferent terms and concepts. Since some of them can have a diferent meaning in another context, I will list them here toclarify what I mean in the context of this book.',
      image: {
        url: `https://placekitten.com/400/200?random=${i}`, 
      },
      created_at: new Date().toISOString(),
      comments_count: Math.floor(Math.random() * 100),
    };
    randomBlogs.push(randomBlog);
  }
  return randomBlogs;
};


const handleLogout = () => {
  removeToken()
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
                  <Link to="/login" className="nav-link" onClick={handleLogout}>
                    Log Out
                  </Link>
                </li>
                <li className="nav-item user-profile">
                  <img 
                    src={userProfileImageUrl}
                    alt="User Profile"
                    className="navbar-profile-image" 
                  /> 
                  <span>{userName.first_name}</span>
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
    {/* Blog section */}
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
      
    <div className="form-inline my-2 my-lg-0 sform" >
    <input
      className="form-control mr-sm-2 isearch"
      type="search"
      placeholder="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <button className="btn  my-2 my-sm-0 sbutton" onClick={handleSearch}>
      Search
    </button>
  </div>
  <h1 className="m-5 text-center">ALL BLOGS</h1>
        <hr />
        <div className="row">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="blog_card">
                  <div className="blog_card_image">
                    <img
                      src={blog.image}
                      height="185px"
                      alt=""
                    />
                  </div>
                  <div className="blog_card_content">
                    <h3>{blog.title}</h3>
                    <p>{blog.content.slice(0, 50)}</p>
                    <p>Category : {blog?.category?.name}</p>
                    <div className="blog_actions">
                      {/* Like Icon */}
                      <span
                        className="blog_action_icon"
          
                      >
                        
                        <p> Likes :  {blog.total_likes} </p>
                      </span> 
                      {/* Follow Icon */}
                      <span
                        className="blog_action_icon"

                      >
                       
                      </span> 
                    </div>
                    <Link
                      to={{
                        pathname: `/blog_detail/${blog.id}`,
                        state: { blogDetails: blog },
                      }}
                      className="read_more_button"
                    >
                      Read More
                    </Link>
                    <div className="blog_date">
                        <p>  </p>
                        <p>{blog.commentsCount} Comments</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-lg-4 col-md-6 col-sm-12">
              <h3>No Blog available at this time.</h3>
            </div>
          )}
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

export default AllBlogs;




