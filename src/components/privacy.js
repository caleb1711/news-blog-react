import React from "react";
import "./style/about.css";
import Header from "./header";


const Privacy = () => {

  return (
    <div className="container-fluid p-0">
      <Header />
      <div class="terms_and_conditions_section">
        <div class="container p-0">
            <h1>Privacy Policy</h1>
            <div class="desc_section privacy-box">
                <h2 class="text-danger">Website Privacy Policy</h2>
                <p>
                    Welcome to the News Blog Privacy Policy. This policy outlines how we collect,
                    use, and protect your personal information on our website.
                </p>

                    <h3>1. Definition of Personal Information</h3>


                    <p class="alphaChar">(a)</p>
                    <p>
                        Personal information refers to details that identify or can be reasonably
                        linked to an individual, whether true or not, and whether recorded in a material form or not.
                    </p>
                    <p class="alphaChar">(i)</p>
                    <p>Includes information regardless of its accuracy.</p>
                    <p class="alphaChar">(ii)</p>
                        <p>Encompasses information in any form, physical or digital.</p>

                        <p class="alphaChar">(b)</p>
                        <p>
                            If information cannot identify you, it may not be classified as personal
                            information and is not covered by this policy.
                        </p>
                        <h3>2. Information We Collect</h3>

                <ul>
                    <li>
                        <p>
                            We collect personal information such as full names, email addresses, and
                            contact numbers. The type of information depends on your interaction with our website.
                        </p>
                    </li>
                </ul>
                <h3>3. How We Collect Your Personal Information</h3>

                <p class="alphaChar">(a)</p>
                <p>
                    Personal information is collected when you input data into the website.
                </p>

                <p class="alphaChar">(b)</p>
                    <p>
                        Cookies are used to enhance your website experience. They help us
                        customize your experience, but they do not personally identify you.
                    </p>

                    <h3>4. Purpose of Collection</h3>

                    <p class="alphaChar">(a)</p>
                    <p>
                        We collect personal information to provide you with the best service
                        experience on the website.
                    </p>

                    <p class="alphaChar">(b)</p>
                    <p>
                        Personal information may be disclosed to service providers assisting
                        in website operation. It may also be exposed to maintenance and support personnel.
                    </p>

                    <p class="alphaChar">(c)</p>
                    <p>
                        Your consent to receive direct marketing material is assumed when using
                        our website. You can opt-out of such communications at any time.
                    </p>

                    <h3>5. Access and Correction</h3>

                <ul>
                    <li>
                        <p>
                            You have the right to access and correct your personal information under
                            Australian Privacy Principles 12 and 13. Contact us to exercise these rights.
                        </p>
                    </li>
                </ul>

                <h3>6. Complaint Procedure</h3>

                <ul>
                    <li>
                        <p>
                            If you have a complaint, contact us for consideration. We may seek
                            further information and take steps to rectify any well-founded issues.
                        </p>
                    </li>
                </ul>

                <h3>7. Overseas Transfer</h3>

                <ul>
                    <li>
                        <p>
                            Your information may be transferred to recipients in the United States
                            and Germany. They have data protection laws similar to Australian Privacy Principles.
                        </p>
                    </li>
                </ul>

                <h3>8. Contact Us About Privacy</h3>

                <ul>
                    <li>
                        <p>
                            For queries, access requests, or privacy-related complaints, contact us at
                            <a href="mailto:info@newsblog.com">info@newsblog.com</a>.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Privacy;

