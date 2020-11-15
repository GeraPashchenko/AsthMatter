import React from "react";
import { connect } from "react-redux";
import localization from "../localization/localization.json";
import './style.css';
import { NavLink } from 'react-router-dom';
import { setUser } from "../redux/actions";

class PatientSideMenuElement extends React.Component {
    constructor(props) {
      super();
      this.setUser = props.setUser;
      this.user = props.user;
      this.language = props.language;
    }
  
    render() {
      return (
        <div className="sideMenu sideMenu1">
            <div className="siteTitle">asthMatter</div>
            <div id="sideMenu" className="flexDiv">
                <NavLink to="/attacksDiary" className="links attacksDiary" activeClassName="current">{localization.sideMenuPatient.attacksDiary[this.language]}</NavLink>
                <NavLink to="/lala" className="links medCardInformation" activeClassName="current">{localization.sideMenuPatient.medCardInformation[this.language]}</NavLink>
                <NavLink to="/lala" className="links medCardRecords" activeClassName="current">{localization.sideMenuPatient.medCardRecords[this.language]}</NavLink>
                <NavLink to="/lala" className="links medicines" activeClassName="current">{localization.sideMenuPatient.medicines[this.language]}</NavLink>
                <NavLink to="/lala" className="links doctor" activeClassName="current">{localization.sideMenuPatient.doctor[this.language]}</NavLink>
                <NavLink to="/inhaler" className="links inhaler" activeClassName="current">{localization.sideMenuPatient.inhaler[this.language]}</NavLink>
                <NavLink to="/lala" className="links profileSettings" activeClassName="current">{localization.sideMenuPatient.profileSettings[this.language]}</NavLink>
                <NavLink to="/" className="links logout" onClick={() => { this.logoutUser() }}>{localization.logoutLink[this.language]}</NavLink>
            </div>
        </div>
      )
    }

    logoutUser() {
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
        this.setUser({});
    }
  }
  
  const storeToProps = (store) => ({
    language: store.language,
    user: store.user
});

const dispatcherToProps = (dispatcher) => ({
    setUser: (user) => dispatcher(setUser(user))
});

export default connect(storeToProps, dispatcherToProps)(PatientSideMenuElement);
  