import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import client from "../../api/client";
import { getToken, removeToken } from "../../util/jwt";
import Header from "../header";

const MyBlogs = () => {
  const [messages] = useState([]);
  const [userName, setUserName] = useState("unknown");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const responseInfo = await client.get("/accounts/user/");
        setUserName(responseInfo.data);
        const response = await client.get("/blog/");
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            setBlogs(response.data);
            setLoading(false);
          } else {
            console.error("API response is not an array:", response.data);
          }
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBlogs();
  }, []);

  const deleteBlogPost = async (postId) => {
    try {
      const response = await client.delete(`/blog/${postId}/`);
      setBlogs((pre) => pre.filter((blg) => blg.id !== postId));
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteBlogPost(postId);
    }
  };
  return (
    <>
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

          <h1 className="m-5 text-center">MY BLOGS</h1>
          <hr />
          {loading ? ( 
          <div className="loader" style={{ color: '#E84609', textAlign: 'center', padding: '20px', fontSize: '24px' }}>Loading...</div>
        ) : (
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
                          style={{ textDecoration: "none" }}
                        >
                          Edit
                        </Link>
                      </p>
                      <p>
                        <a
                          onClick={() => handleDelete(blog.id)}
                          style={{
                            textDecoration: "none",
                            color: "red",
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

        )}
        </div>
      </div>
    </>
  );
};

export default MyBlogs;
