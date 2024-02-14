import React from "react";
import "./style/about.css";
import Header from "./header";


const Disclaimer = () => {

  return (
    <div className="container-fluid p-0">
      <Header />
      <div class="terms_and_conditions_section">
        <div class="container p-0">
            <h1>Disclaimer</h1>
            <div class="desc_section privacy-box">
                <h2 class="text-danger">Important Notice Regarding Website Information</h2>
                <p>
                    The information provided on the News Blog website is for general informational purposes only.
                    While we strive to keep the information up to date and accurate, we make no representations
                    or warranties of any kind, express or implied, about the completeness, accuracy, reliability,
                    suitability, or availability with respect to the website or the information contained on the website.
                </p>
                
                <h3>1. Use of Information</h3>
                <p>
                    Any reliance you place on such information is strictly at your own risk. We are not liable for
                    any loss or damage, including but not limited to indirect or consequential loss or damage,
                    arising from the use of or in connection with the use of this website.
                </p>

                <h3>2. Accuracy and Updating</h3>
                <p>
                    The content provided may be subject to change without notice. While we make efforts to ensure
                    the accuracy of the information, we do not guarantee that the information is up-to-date or error-free.
                </p>

                <h3>3. External Links</h3>
                <p>
                    Our website may contain links to external websites. These links are provided for convenience
                    and do not signify endorsement. We have no control over the content of external sites and are not
                    responsible for their content.
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

export default Disclaimer;

