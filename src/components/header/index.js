import React from "react";
import withUser from "../withUser";
import { DEFAULT_USER_PROFILE, USER_STORAGE_KEY } from "../../config/constants";
import { Link } from "react-router-dom";
import { removeToken } from "../../util/jwt";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
              <ul className="navbar-nav">
                {user ? (
                  <>
                    {/* <li className="nav-item">
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
                    </li> */}
                    {/*  */}
                    <button
                      className="dropdown-toggle header_dropdown_top"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="user_name_and_iamge">
                        <img src={DEFAULT_USER_PROFILE} alt="" />
                        <h6 className="user_name_top"></h6>
                      </div>
                    </button>
                    <ul className="dropdown-menu dropdown_menu_item">
                    <li className="">
                      <Link to="/myblogs" className="dropdown-item item_1">
                        My Blogs
                      </Link>
                    </li>
                    <li className="">
                      <Link to="/addblog" className="dropdown-item item_1">
                        Add Blog
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="/login"
                        className="dropdown-item item_1"
                        onClick={handleLogout}
                      >
                        Log Out
                      </Link>
                    </li>
                    </ul>
                    {/* dropdown-item item_1 */}
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
  );
}

export default withUser(Header);
