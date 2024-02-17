import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/accounts.css";
import client from "../../api/client";
import { getToken, removeToken } from "../../util/jwt";
import { USER_STORAGE_KEY } from "../../config/constants";
import Header from "../header";

const AddBlog = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [formImage, setFormImage] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAddingBlog, setIsAddingBlog] = useState(false); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await client.get("/blog/categories/");
        const data = response.data;
        setCategories(data);
        if (data) setCategory(data[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const validateForm = () => {
      const isValid =
        formImage && formTitle.trim() !== "" && formContent.trim() !== "" && category;
      setIsFormValid(isValid);
    };
    validateForm();
  }, [formImage, formTitle, formContent, category]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isAddingBlog) return; 

    try {
      setIsAddingBlog(true); 
      const formData = new FormData();
      formData.append("image", formImage);
      formData.append("title", formTitle);
      formData.append("content", formContent);
      formData.append("category", category);
      const response = await client.post("/blog/", formData);
      setFormImage(null);
      setFormTitle("");
      setFormContent("");
      navigate("/myblogs");
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsAddingBlog(false); 
    }
  };

  const userLoggedIn = localStorage.getItem(USER_STORAGE_KEY);

  if (!userLoggedIn) {
    navigate("/login");
    return null;
  }
 
  return (
    <div className="container-fluid p-0">
      <Header />

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
            <select
              name="category"
              className="form-select mb-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!isFormValid || isAddingBlog}
            >
              {isAddingBlog ? "Adding Blog..." : "Add Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
 
};

export default AddBlog;
