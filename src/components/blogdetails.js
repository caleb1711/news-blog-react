import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaThumbsUp } from 'react-icons/fa';
import './style/accounts.css';
import './style/details.css';
import client from '../api/client';
import { getToken, removeToken } from '../util/jwt';

const BlogDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const handleLogout = () => {
    removeToken();
  };

  const [blog, setBlog] = useState({});
  // remove setMessages
  const [messages ] = useState([]);
  const [form, setForm] = useState({ content: '' });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken()
        setUserIsAuthenticated(!!token);
        const responseInfo = await client.get('/accounts/user/')
        console.log('Token from localStorage:', token);

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
  
      if (location.state && location.state.blogDetails) {
        setBlog(location.state.blogDetails);
      } else {
        try {
          const blogResponse = await client.get(`/blog/public/${id}/`);
          setBlog(blogResponse.data); 
        } catch (error) {
          console.error('Error fetching blog:', error);
        }
      }
    };


    fetchData();
  }, [location.state, id]);

  const addComment = async () => {
    try {
      const response = await client.post(`/blog/public/${id}/comment/`, {
        blog: id,
        content: commentText,
      });
      
      const newComment = response.data; 
      setComments([...comments, newComment]); 
      setCommentText(''); 
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
 
  const handleLike = async (e) => {
    const icon = e.currentTarget;
    icon.classList.add('clicked');
  
    setTimeout(() => {
      icon.classList.remove('clicked');
    }, 1000);
    try {
      const response = await client.put(`/blog/public/${id}/like/`);
      const { is_liked, likes_count } = response.data;
      setIsLiked(is_liked);
      setLikesCount(likes_count);
    } catch (error) {
      console.error('Error liking:', error);
    }
  };

  

const userProfileImageUrl = 'https://e7.pngegg.com/pngimages/136/22/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail.png';


  return (

    <><div className="container-fluid p-0">
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
                  <span></span>
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

        <h1 className="m-3 text-center">{blog.title}</h1>
        {form.errors && (
          <div className="alert alert-danger">
            <ul>
              {Object.values(form.errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <hr className="mb-3" />
        <div className="row mb-5">
          <div className="container_listing">
            <div className="list_detail_flex">
              <div className="list_detail">
                <div className="detail">
                  <img src={blog.image} width="100%" alt="" />
                </div>
                <h2>{blog.title}</h2>
                <div className="list_description">
                  <p>{blog.content}</p>
                </div>
              </div>


              <div className="list_detail_reviews">
                <div className="give_rev">
                  <h3>Leave a comment</h3>
                </div>
                { userIsAuthenticated ? (
                <div >
                  <div className="review_form">
                    <textarea
                    cols="30"
                    rows="10"
                    name="content"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Post Your Comment ....."
                    ></textarea>
                  </div>

                  <div className="post_comment">
                    <button onClick={addComment}>Post Comment</button>
                  </div>
                </div>
                ) : (
                <Link
                  to="/login"
                  className="item_1"
                  style={{ textDecoration: 'none' }}
                  >
                      First Login to leave the comment.
                </Link>
                )}  

                <div className="all_rev">
                  <div className="rev_head">
                    <h2>Reviews</h2>
                  </div>
                </div>

                {blog.comments &&
                  blog.comments.map((comment) => (
                    <div key={comment.id} className="client_review">
                      <div className="client_name">
                        <img
                          src={userProfileImageUrl}
                          width="35px"
                          alt="" />
                       
                        <p>{comment.user && comment.user.email}</p>
                      </div>
                      <div className="rev_text">
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  ))}
              </div>
          </div>
        </div>
        <div className="follow-section">
            {/* <button className={`follow-button ${isFollowing ? 'following' : ''}` } onClick={handleFollow}>
              {isFollowing ? 'Following' : ' + Follow'}
            </button>
            <span className="follower-count blog_action_icon" style={{ marginRight: '1em' }}>{followersCount} Followers  </span> */}
            <button 
              className={`like-button ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              <FaThumbsUp className="blog-action-icon" />
            </button>
            <span className="like-count blog_action_icon">
               Likes
            </span>
        </div>
        
      </div>
    </div>
    </div><footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 News Blog. All rights reserved.</p>
        </div>
      </footer></>
  
  );
};

export default BlogDetail;
