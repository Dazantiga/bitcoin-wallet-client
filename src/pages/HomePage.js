import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./transactions/Transactions";
import TransactionForm from "./transactions/TransactionsForm";
import TransactionEditForm from "./transactions/TransactionsEditForm";
import Settings from "./Settings";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Lock from "./auth/Lock";
import NotFoundPage from "./error/NotFound";
import ServerError from "./error/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, isPrivate, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const logged = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  if (!logged && isPrivate) {
    return <Redirect to="/auth/sign-in" />;
  }

  if (logged && !isPrivate) {
    return <Redirect to="/dashboard/overview" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer
              toggleSettings={toggleSettings}
              showSettings={showSettings}
            />
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar
      exact
      path={Routes.DashboardOverview.path}
      component={DashboardOverview}
      isPrivate
    />
    <RouteWithSidebar
      exact
      path={Routes.Transactions.path}
      component={Transactions}
      isPrivate
    />
    <RouteWithSidebar
      exact
      path={Routes.TransactionForm.path}
      component={TransactionForm}
      isPrivate
    />
    <RouteWithSidebar
      exact
      path={Routes.TransactionEditForm.path}
      component={TransactionForm}
      isPrivate
    />
    <RouteWithSidebar
      exact
      path={Routes.Settings.path}
      component={Settings}
      isPrivate
    />

    <Redirect to={Routes.Signin.path} />
  </Switch>
);
