import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../utils/loader";

export default function AuthGuard(ComposedComponent) {
  const AuthenticationCheck = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const users = useSelector((state) => state.users);

    useEffect(() => {
      if (!users.auth) {
        props.history.push("/");
      } else {
        setIsAuth(true);
      }
    }, [props, users]);

    if (!isAuth) {
      return <Loader full={true} />;
    } else {
      return <ComposedComponent users={users} {...props} />;
    }
  };
  return AuthenticationCheck;
}
