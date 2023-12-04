import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import "./style/accounts.css";
import "./style/details.css";
import client from "../api/client";
import { DEFAULT_USER_PROFILE } from "../config/constants";
import WithUser from "./withUser";
import Header from "./header";

const BlogDetail = ({ user }) => {
  const { id } = useParams();
  const location = useLocation();
  // const [likesCount, setLikesCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const [blog, setBlog] = useState({});
  // remove setMessages
  const [messages] = useState([]);
  const [form, setForm] = useState({ content: "" });
  const fechBlog = async () => {
    if (location.state && location.state.blogDetails) {
      setBlog(location.state.blogDetails);
    } else {
      try {
        const blogResponse = await client.get(`/blog/public/${id}/`);
        setBlog(blogResponse.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }
  };
  useEffect(() => {
    fechBlog()
  }, [location.state, id]);

  const addComment = async () => {
    try {
      const response = await client.post(`/blog/public/${id}/comment/`, {
        blog: id,
        content: commentText,
      });

      const newComment = response.data;
      setComments([...comments, newComment]);
      setCommentText("");
      fechBlog()
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async (e) => {
    const icon = e.currentTarget;
    icon.classList.add("clicked");
    setTimeout(() => {
      icon.classList.remove("clicked");
    }, 1000);
    try {
      await client.post(`/blog/public/${id}/like/`);
      fechBlog()
    } catch (error) {
      console.error("Error liking:", error);
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header />
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
                {user ? (
                  <div>
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
                    style={{ textDecoration: "none" }}
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
                        <img src={DEFAULT_USER_PROFILE} width="35px" alt="" />

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
              className={`like-button ${blog.liked ? "liked" : ""}`}
              onClick={handleLike}
            >
              <FaThumbsUp className="blog-action-icon" />
            </button>
            <span className="like-count blog_action_icon">{blog.total_likes} Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithUser(BlogDetail);
