import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from "./components/home";
import Footer from "./components/navigation/footer";
import Header from "./components/navigation/header";
import MainLayout from "./hoc/mainLayout";
import RegisterLogin from "./components/auth";

import { useDispatch, useSelector } from "react-redux";
import Loader from "./utils/loader";
import { userIsAuth, userSignOut } from "./store/actions/user.actions";

const Routes = (props) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut());
  };

  useEffect(() => {
    dispatch(userIsAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user.auth !== null) setLoading(false);
  }, [user]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader full={true} />
      ) : (
        <>
          <Header user={user} signOutUser={signOutUser} />
          <MainLayout>
            <Switch>
              <Route path="/sign_in" component={RegisterLogin} />
              <Route path="/" component={Home} />
            </Switch>
          </MainLayout>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default Routes;
