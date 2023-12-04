import React from "react";
import withUser from "../withUser";
import { DEFAULT_USER_PROFILE, USER_STORAGE_KEY } from "../../config/constants";
import { Link } from "react-router-dom";
import { removeToken } from "../../util/jwt";

function Header({ user }) {
  const handleLogout = () => {
    removeToken();
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <div className="main_header dashboard_header">
      <div className="container main_header_container">
        <div className="main_header_text">
          <Link to="/" style={{ textDecoration: "none" }}>
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
                {user ? (
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
                      <Link
                        to="/login"
                        className="nav-link"
                        onClick={handleLogout}
                      >
                        Log Out
                      </Link>
                    </li>
                    <li className="nav-item user-profile">
                      <img
                        src={DEFAULT_USER_PROFILE}
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
  );
}

export default withUser(Header);