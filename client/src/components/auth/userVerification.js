import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/loader";
import { userAccountVerify } from "../../store/actions/user.actions";

import Favorite from "@material-ui/icons/Favorite";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

const iconStyle = {
  fontSize: "200px",
};

const UserVerification = (props) => {
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const query = new URLSearchParams(props.location.search);
  const token = query.get("t");

  useEffect(() => {
    if (token) {
      dispatch(userAccountVerify(token));
    } else {
      props.history.push("/");
    }
  }, [dispatch, props.history, token]);

  useEffect(() => {
    if (notifications && notifications.error) {
      setIcon(<SentimentDissatisfiedIcon style={iconStyle} />);
      setLoading(false);
      setRedirect(true);
    }
    if (notifications && notifications.success) {
      setIcon(<Favorite style={iconStyle} />);
      setLoading(false);
      setRedirect(true);
    }
  }, [notifications]);

  useEffect(() => {
    if (redirect) setTimeout(() => props.history.push("/dashboard"), 2000);
  }, [redirect, props.history]);

  return (
    <div className="page_container">
      {loading ? <Loader /> : <div style={{ textAlign: "center" }}>{icon}</div>}
    </div>
  );
};

export default UserVerification;
