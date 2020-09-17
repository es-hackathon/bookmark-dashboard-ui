import React, { Component } from 'react';
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
import AuthContext from "./AuthContext";
import Auth from './auth/Auth';
import Callback from './Callback';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),

    };
  }
  
   render() {
    const { auth } = this.state;
    return (
     <AuthContext.Provider value={auth}>
    <div className="container-fluid padding-align ">
      <Header auth={auth} />
      <Switch>
        <Route exact path="/" auth={auth} component={HomePage} />
        <Route path="/callback"
          render={props => <Callback auth={auth} {...props} />}/>
        <Route exact auth={auth} path="/about" component={AboutPage} />
        <Route exact auth={auth} path="/groups" component={GroupsPage} />
        <Route exact auth={auth} path="/group/:id" component={ManageGroupPage} />
        <Route exact auth={auth} path="/group" component={ManageGroupPage} />
        <Route exact auth={auth} path="/cards" component={CardPage} />
        <Route exact auth={auth} path="/card/:id" component={ManageCardPage} />
        <Route exact auth={auth} path="/card" component={ManageCardPage} />
        <Route exact auth={auth} path="/cardview/:id" component={CardView} />
        <Route exact auth={auth} component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
   </AuthContext.Provider>
  );
  }
}

export default App;
