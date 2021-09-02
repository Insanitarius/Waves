import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Loader from "./utils/loader";
import { userIsAuth, userSignOut } from "./store/actions/user.actions";

import Home from "./components/home";
import Footer from "./components/navigation/footer";
import Header from "./components/navigation/header";
import MainLayout from "./hoc/mainLayout";
import RegisterLogin from "./components/auth";
import Dashboard from "./components/dashboard";
import AuthGuard from "./hoc/authGuard";
import UserInfo from "./components/dashboard/user/info";
import AdminProducts from "./components/dashboard/admin/products";
import ScrollToTop from "./utils/scrollToTop";
import AddProduct from "./components/dashboard/admin/products/manage/add";
import EditProduct from "./components/dashboard/admin/products/manage/edit";
import Shop from "./components/shop";
import ProductDetail from "./components/product";
import UserCart from "./components/dashboard/user/cart";
import ManageSite from "./components/dashboard/admin/site";

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
            <ScrollToTop />
            <Switch>
              <Route
                path="/dashboard/admin/edit_product/:id"
                component={AuthGuard(EditProduct)}
              />
              <Route
                path="/dashboard/admin/add_product"
                component={AuthGuard(AddProduct)}
              />
              <Route
                path="/dashboard/admin/admin_products"
                component={AuthGuard(AdminProducts)}
              />
              
              <Route
                path="/dashboard/admin/manage_site"
                component={AuthGuard(ManageSite)}
              />
              <Route
                path="/dashboard/user/user_cart"
                component={AuthGuard(UserCart)}
              />
              <Route
                path="/dashboard/user/user_info"
                component={AuthGuard(UserInfo)}
              />
              <Route path="/dashboard" component={AuthGuard(Dashboard)} />
              <Route path="/product_detail/:id" component={ProductDetail} />
              <Route path="/shop" component={Shop} />
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
