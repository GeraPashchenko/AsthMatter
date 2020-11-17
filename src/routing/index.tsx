import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpPage from "../pages/SignUp/SignUpPage.js";
import SignInPage from '../pages/SignIn/SignInPage.jsx';
import AttacksDiary from "../pages/AttacksDiary/AttacksDiary";
import AddAttackPage from "../pages/AddAttackPage/AddAttackPage";
import InhalerPage from "../pages/InhalerPage/InhalerPage.jsx";
import ProfileSettingsPage from "../pages/ProfileSettingsPage/ProfileSettingsPage"
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage";
import DoctorPage from "../pages/DoctorPage/DoctorPage.jsx";
import MedCardInformationPage from "../pages/MedCardInformationPage/MedCardInformationPage.jsx";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/signUp' component={SignUpPage}/>
        <Route exact path='/' component={SignInPage} />
        <Route exact path='/attacksDiary' component={AttacksDiary} />
        <Route exact path='/m' component={AddAttackPage} />
        <Route exact path='/inhaler' component={InhalerPage} />
        <Route exact path='/profileSettings' component={ProfileSettingsPage} />
        <Route exact path='/changePassword' component={ChangePasswordPage} />
        <Route exact path='/doctor' component={DoctorPage} />
        <Route exact path='/medCardInformation' component={MedCardInformationPage} />
      </Switch>
    </Router>
  );
};
export default Root;
