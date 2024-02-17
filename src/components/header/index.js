import React from "react";
import withUser from "../withUser";
import { USER_STORAGE_KEY , JWT_CONFIG} from "../../config/constants";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import cookie from "cookiejs";

function Header({ user }) {
   
  const handleLogout = () => {
    cookie.remove(JWT_CONFIG.TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    
  };

  return (


    // 
    <div class="container-fluid p-0">
    <div class="main_header dashboard_header">
        <nav class="navbar navbar-expand-lg  custom-header">
            <div class="main_header_text">
            <Link to="/" style={{ textDecoration: "none" }}>
                <h4>Ne<span style={{ color: "#ea2d00" }}>w</span>s</h4>
                <p>Blog</p>
            </Link>
            </div>
            <button class="navbar-toggler navbar_toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav navbar_nav">
                <li class="nav-item">
                  <Link to='/' className="nav-link"> Home</Link>
                </li>
                <li class="nav-item">
                <Link to='/about' className="nav-link"> About Us</Link>
                </li>

                <li class="nav-item">
                <Link to='/contact' className="nav-link"> Contact Us</Link>
                </li>
                {user ? (
                  <>
                  <li class="nav-item">
                  <Link to="/addblog" className="nav-link">
                    Add Blog
                    </Link>
                  </li>
                  <li class="nav-item">
                  <Link to="/myblogs" className="nav-link">
                    My Blogs
                    </Link>
                  </li>

                  <li class="nav-item">
                  <Link
                        to="/login"
                      >
                    <button class="btn login-btn" onClick={handleLogout}>Log Out</button>
                    </Link>
                  </li>
                  </>
                ) : (
                  <div class="d-flex gap-3">
                    <li class="nav-item">
                    <Link to="/login" >
                        <button class="btn login-btn" >Login</button>
                      </Link>
                      </li>
                      <li class="nav-item">
                      <Link to="/signup" >
                        <button class="btn register-btn" >Register</button>
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
