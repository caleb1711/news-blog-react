import React from "react";
import ReactDOM from "react-dom/client";
import "./components/style/footer.css"
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <footer className="footer">
        {/* <div className="footerText">
            <h1>Your Blog Journey Starts Here</h1>
            <h3>Click here to get registered</h3>
            <a href="/signup" className="signup-link"><h2 className="text-danger">SIGN UP</h2></a>
        </div> */}
        <div className="black-section">
            <div className="row">
                <div className="col-lg-6 col-md-3 col-sm-4 logo-link-col">
                    <a href="/" className="logo-link">
                        <div className="main_header_text">
                        <a href="/" style={{ textDecoration: 'none' }}>
                          <h4>
                              Ne<span style={{ color: '#ea2d00' }}>w</span>s
                          </h4>
                          <p>Blog</p>
                        </a>
                        </div>
                    </a>
                </div>
                
                <div className="col-lg-3 col-md-2 col-sm-4 col-12">
                    <ul className="list-unstyled">
                        <li>
                            <a href="/about" className="nav-link1">About</a>
                        </li>
                        <li>
                            <a href="/contact" className="nav-link1">Contact Us</a>
                        </li>
                        
                    </ul>
                </div>
                
                <div className="col-lg-3 col-md-2 col-sm-4 col-12">
                    <ul className="list-unstyled">
                        <li>
                            <a href="/privacy" className="nav-link1">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/terms" className="nav-link1">Terms & Conditions</a>
                        </li>
                        <li>
                            <a href="/disclaimer" className="nav-link1">Disclaimer</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
       <div className="copy_rightDiv">
        <p className="copy_right">© 2024 NewsBlog. All rights reserved</p>
       </div>
    </footer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
