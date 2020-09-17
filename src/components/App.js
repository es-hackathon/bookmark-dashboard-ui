import React from 'react';
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import ManageCardPage from './cards/ManageCardPage';
import CardPage from "./cards/CardPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupsPage from "./groups/GroupsPage";
import ManageGroupPage from './groups/ManageGroupPage';
import CardView from "./cardview/cardview";

function App() {
  return (
    <div className="container-fluid padding-align ">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/groups" component={GroupsPage} />
        <Route exact path="/group/:id" component={ManageGroupPage} />
        <Route exact path="/group" component={ManageGroupPage} />
        <Route exact path="/cards" component={CardPage} />
        <Route exact path="/card/:id" component={ManageCardPage} />
        <Route exact path="/card" component={ManageCardPage} />
        <Route exact path="/cardview/:id" component={CardView} />
        <Route exact component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
