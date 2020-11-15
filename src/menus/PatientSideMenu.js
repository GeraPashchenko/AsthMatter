import React from "react";
import { connect } from "react-redux";
import localization from "../localization/localization.json";
import './style.css';
import {  NavLink } from 'react-router-dom';
import { setUser } from "../redux/actions";

function PatientSideMenu(props) {
    const { language, user } = props;

    return (
        <div className="sideMenu sideMenu1">
            <div className="siteTitle">asthMatter</div>
            <div id="sideMenu" className="flexDiv">
                <NavLink to="/signIn" className="links attacksDiary" activeClassName="current">{localization.sideMenuPatient.attacksDiary[language]}</NavLink>
                <NavLink to="/lala" className="links medCardInformation" activeClassName="current">{localization.sideMenuPatient.medCardInformation[language]}</NavLink>
                <NavLink to="/lala" className="links medCardRecords" activeClassName="current">{localization.sideMenuPatient.medCardRecords[language]}</NavLink>
                <NavLink to="/lala" className="links medicines" activeClassName="current">{localization.sideMenuPatient.medicines[language]}</NavLink>
                <NavLink to="/lala" className="links doctor" activeClassName="current">{localization.sideMenuPatient.doctor[language]}</NavLink>
                <NavLink to="/lala" className="links inhaler" activeClassName="current">{localization.sideMenuPatient.inhaler[language]}</NavLink>
                <NavLink to="/lala" className="links profileSettings" activeClassName="current">{localization.sideMenuPatient.profileSettings[language]}</NavLink>
    <NavLink to="/signIn" className="links logout" activeClassName="current" onClick={() => { logoutUser() }}>{localization.logoutLink[language]}</NavLink>
    {/* {this.state.redirect === true ? (<Redirect to="/signIn" />) : null} */}
            </div>
        </div>
    )
}

function logoutUser(){
    fetch(`https://localhost:5001/profiles/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(responce => {
            return responce.json()
        }).catch(err => {
            alert(err.message);
        });
}

const storeToProps = (store) => ({
    language: store.language,
    user : store.user
});

const dispatcherToProps = (dispatcher) => ({
    setUser : (user) => dispatcher(setUser(user))
});

export default connect(storeToProps, dispatcherToProps)(PatientSideMenu);