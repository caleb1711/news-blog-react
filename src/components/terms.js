import React from "react";
import "./style/about.css";
import Header from "./header";


const TermsandConditions = () => {

  return (
    <div className="container-fluid p-0">
      <Header />
      <div class="terms_and_conditions_section">
        <div class="container p-0">
            <h1>Terms and Conditions</h1>
            <div class="desc_section privacy-box">
                <h2 class="text-danger">Welcome to News Blog</h2>
                <p>
                    News Blog is dedicated to providing valuable information and fostering a
                    community of passionate individuals interested in blogging and content creation.
                </p>

                <h3>1. Our Mission</h3>
                <p>
                    Our mission is to empower aspiring bloggers by offering insightful content,
                    resources, and a supportive platform for sharing ideas and experiences.
                </p>

                <h3>2. Who We Are</h3>
                <p>
                    At News Blog, we are a team of enthusiastic writers, bloggers, and tech
                    enthusiasts who believe in the power of sharing knowledge and experiences.
                </p>

                <h3>3. What We Offer</h3>
                <p>
                    Explore a variety of topics related to blogging, content creation, and digital
                    marketing. Whether you're a beginner or an experienced blogger, you'll find
                    valuable insights and tips to enhance your skills.
                </p>

                <h3>4. Join Our Community</h3>
                <p>
                    Connect with like-minded individuals, participate in discussions, and share
                    your blogging journey with our growing community. Together, we can inspire and
                    support each other in achieving our blogging goals.
                </p>
               
                <h3>8. Contact Us</h3>

                        <p>
                            For queries, access requests, or privacy-related complaints, contact us at
                            <a href="mailto:info@newsblog.com">info@newsblog.com</a>.
                        </p>
    
            </div>
        </div>
    </div>
    </div>
  );
}

export default TermsandConditions;

