import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from "./components/home";
import Footer from "./components/navigation/footer";
import Header from "./components/navigation/header";
import MainLayout from "./hoc/mainLayout";

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainLayout>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </MainLayout>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
