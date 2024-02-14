import React from "react";
import "./style/about.css";
import Header from "./header";


const Contact = () => {

  return (
    <div className="container-fluid p-0">
      <Header />
      <div class="terms_and_conditions_section">
        <div class="container p-0">
            <h1>Contact Us</h1>
            <div class="desc_section privacy-box">
                <h2 class="text-danger">Get in Touch with News Blog</h2>
                <p>
                    Have questions, suggestions, or just want to reach out? Feel free to contact us
                    using the email address below:
                </p>

                <h3>Email</h3>
                <p>
                    <a href="mailto:info@NewsBlog.com">info@NewsBlog.com</a>
                </p>
                
                <p>
                    We appreciate your feedback and look forward to hearing from you!
                </p>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Contact;

