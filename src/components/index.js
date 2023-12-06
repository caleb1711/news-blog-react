import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style/accounts.css";
import client from "../api/client";
import Header from "./header";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await client.get("/blog/public/");
        console.log("All Blogs : ", response.data);
        const updatedResponseData = response.data.map((blog) => {
          return {
            ...blog,
            commentsCount: blog.comments.length,
          };
        });
        setBlogs(updatedResponseData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await client.get(`/blog/public/?search=${query}`);
      setBlogs(response.data);
      console.log("Search Blogs : ", query, response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="container blog_container">
        <div className="form-inline my-2 my-lg-0 sform">
          <input
            className="form-control mr-sm-2 isearch"
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn   my-sm-0 sbutton" onClick={handleSearch}>
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
                    <img src={blog.image} height="185px" alt="" />
                  </div>
                  <div className="blog_card_content">
                    <h3>{blog.title}</h3>
                    <p>{blog.content.slice(0, 50)}</p>
                    <p>Category : {blog?.category?.name}</p>
                    <div className="blog_actions">
                      {/* Like Icon */}
                      <span className="blog_action_icon">
                        <p> Likes : {blog.total_likes} </p>
                      </span>
                      {/* Follow Icon */}
                      <span className="blog_action_icon"></span>
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
                      <p> </p>
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
    </div>
  );
};

export default AllBlogs;
