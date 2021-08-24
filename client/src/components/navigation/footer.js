import React from "react";

import ContactsIcon from "@material-ui/icons/Contacts";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import { useSelector } from "react-redux";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="bck_b_dark">
          <div className="container">
            <div className="logo">WAVES</div>
            <div className="wrapper">
              <div className="left">
                <h2>Contact Information</h2>
                <div className="business_nfo">
                  <div className="tag">
                    <ContactsIcon />
                    <div className="nfo">
                      <div>Address</div>
                      <div>Some Avenue 222</div>
                    </div>
                  </div>
                  <div className="tag">
                    <PhoneIcon />
                    <div className="nfo">
                      <div>Phone</div>
                      <div>1235412</div>
                    </div>
                  </div>
                  <div className="tag">
                    <TimelapseIcon />
                    <div className="nfo">
                      <div>Working hours</div>
                      <div>9am-9pm</div>
                    </div>
                  </div>
                  <div className="tag">
                    <EmailIcon />
                    <div className="nfo">
                      <div>Email</div>
                      <div>test@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <h2>Be the first</h2>
                <div>
                  <div>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
