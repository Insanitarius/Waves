import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ user, signOutUser }) => {
  return (
    <>
      <header className="container bck_b_light">
        <div className="container" style={{ display: "flex" }}>
          <div className="left">
            <div className="logo">
              <Link className="logo" to="/">
                WAVES
              </Link>
            </div>
          </div>
          <div className="right">
            <div className="top">
              {user.auth ? (
                <>
                  <Link to="/dashboard/user/user_cart">
                    <div className="cart_link">
                      <span
                        style={{
                          left: `${
                            user.data.cart.length >= 10 ? "-47px" : "-40px"
                          }`,
                        }}
                      >
                        {user.data.cart.length}
                      </span>
                    </div>
                    My Cart
                  </Link>
                  <Link to="/dashboard">My Account</Link>
                  <span onClick={() => signOutUser()}> Log out</span>
                </>
              ) : (
                <Link to="/sign_in">Log in</Link>
              )}
            </div>
            <div className="bottom">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
