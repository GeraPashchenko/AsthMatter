import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignUpPage from "../pages/SignUp/SignUpPage.js";
import SignInPage from '../pages/SignIn/SignInPage.jsx';
import AttacksDiary from "../pages/AttacksDiary/AttacksDiary";
import AddAttackPage from "../pages/AddAttackPage/AddAttackPage";
import InhalerPage from "../pages/InhalerPage/InhalerPage.jsx";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SignUpPage}/>
        {/* <Route exact path='/signUp' component={SignUpPage}/> */}
        <Route exact path='/signIn' component={SignInPage}/>
        <Route exact path='/attacksDiary' component={AttacksDiary}/>
        <Route exact path='/m' component={AddAttackPage}/>
        <Route exact path='/inhaler' component={InhalerPage}/>
      </Switch>
    </Router>
  );
};
export default Root;
