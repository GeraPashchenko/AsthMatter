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
import MedCardRecordsPage from "../pages/MedCardRecordsPage/MedCardRecordsPage.jsx";
import MedRecordPage from "../pages/MedRecordPage/MedRecordPage.jsx";
import MedicinesPage from '../pages/MedicinesPage/MedicinesPage.jsx';
import MainBoardPage from '../pages/Admins/MainBoardPage/MainBoardPage.jsx';
import PatientsPage from "../pages/Admins/PatientsPage/PatientsPage.jsx";
import AdminsPage from "../pages/Admins/AdminsPage/AdminsPage.jsx";
import CreateAdminPage from '../pages/Admins/CreateAdminPage/CreateAdminPage';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/signUp' component={SignUpPage} />
        <Route exact path='/' component={SignInPage} />

        {/* Patients Pages */}
        <Route exact path='/attacksDiary' component={AttacksDiary} />
        <Route exact path='/m' component={AddAttackPage} />
        <Route exact path='/inhaler' component={InhalerPage} />
        <Route exact path='/profileSettings' component={ProfileSettingsPage} />
        <Route exact path='/changePassword' component={ChangePasswordPage} />
        <Route exact path='/doctor' component={DoctorPage} />
        <Route exact path='/medCardInformation' component={MedCardInformationPage} />
        <Route exact path='/medCardRecords' component={MedCardRecordsPage} />
        <Route exact path='/medrecord/:id' component={MedRecordPage} />
        <Route exact path='/medicines' component={MedicinesPage} />

        {/* Admins Pages */}
        <Route exact path='/mainboard' component={MainBoardPage} />
        <Route exact path='/patients' component={PatientsPage} />
        <Route exact path='/admins' component={AdminsPage} />
        <Route exact path='/createAdmin' component={CreateAdminPage} />
      </Switch>
    </Router>
  );
};
export default Root;
