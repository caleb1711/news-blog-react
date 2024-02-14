import React from "react";
import withUser from "../withUser";
import { removeToken } from "../../util/jwt";
import { Link } from "react-router-dom";
import { USER_STORAGE_KEY } from "../../config/constants";

function Header({ user }) {
  const handleLogout = () => {
    removeToken();
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <div className="container-fluid p-0">
      <div className="main_header dashboard_header">
        <nav className="navbar navbar-expand-lg  custom-header">
          <div className="main_header_text">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h4>
                Ne<span style={{ color: "#ea2d00" }}>w</span>s
              </h4>
              <p>Blog</p>
            </Link>
          </div>
          <button
            className="navbar-toggler navbar_toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav navbar_nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact Us
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/addblog" className="nav-link">
                      Add Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/myblogs" className="nav-link">
                      My Blogs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn login-btn" onClick={handleLogout}>
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <div className="d-flex gap-3">
                  <li className="nav-item">
                    <Link to="/login">
                      <button className="btn login-btn">Login</button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup">
                      <button className="btn register-btn">Register</button>
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default withUser(Header);
