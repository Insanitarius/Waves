import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../utils/tools";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifcations } from "../store/actions";

const MainLayout = (props) => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications && notifications.success) {
      const msg = notifications.msg ? notifications.msg : "Success";
      showToast("SUCCESS", msg);
      dispatch(clearNotifcations());
    }
    if (notifications && notifications.error) {
      const msg = notifications.msg ? notifications.msg : "Error";
      showToast("ERROR", msg);
      dispatch(clearNotifcations());
    }
  }, [notifications, dispatch]);

  return (
    <>
      {props.children}
      <ToastContainer />
    </>
  );
};

export default MainLayout;
