import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import client from "../../api/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/accounts.css";
import { getToken, removeToken } from "../../util/jwt";
import Header from "../header";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(`/blog/${id}/`);
        console.log("the data of ", response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      if (title) formData.append("title", title);
      if (content) formData.append("content", content);

      const response = await client.patch(`/blog/${id}/`, formData);

      setImage(null);
      setTitle("");
      setContent("");

      console.log("Form submitted successfully:", response.data);
      navigate("/myblogs");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header />
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
    </div>
  );
};

export default EditBlog;
