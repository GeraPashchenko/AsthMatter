import React from "react";
import { connect } from "react-redux";
import localization from "../localization/localization.json";
import './style.css';
import { NavLink } from 'react-router-dom';

class PatientSideMenuElement extends React.Component {
    constructor(props) {
        super();
        this.serverAddress = props.serverAddress;
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    render() {
        return (
            <div className="sideMenu sideMenu1">
                <div className="siteTitle">asthMatter</div>
                <div id="sideMenu" className="flexDiv">
                    <NavLink to="/attacksDiary" className="links attacksDiary" activeClassName="current">
                        {localization.sideMenuPatient.attacksDiary[this.props.language]}
                    </NavLink>
                    <NavLink to="/medCardInformation" className="links medCardInformation" activeClassName="current">
                        {localization.sideMenuPatient.medCardInformation[this.props.language]}
                    </NavLink>
                    <NavLink to="/medCardRecords" className="links medCardRecords" activeClassName="current">
                        {localization.sideMenuPatient.medCardRecords[this.props.language]}
                    </NavLink>
                    <NavLink to="/medicines" className="links medicines" activeClassName="current">
                        {localization.sideMenuPatient.medicines[this.props.language]}
                    </NavLink>
                    <NavLink to="/doctor" className="links doctor" activeClassName="current">
                        {localization.sideMenuPatient.doctor[this.props.language]}
                    </NavLink>
                    <NavLink to="/inhaler" className="links inhaler" activeClassName="current">
                        {localization.sideMenuPatient.inhaler[this.props.language]}
                    </NavLink>
                    <NavLink to="/profileSettings" className="links profileSettings" activeClassName="current">
                        {localization.sideMenuPatient.profileSettings[this.props.language]}
                    </NavLink>
                    <NavLink to="/" className="links logout" onClick={() => { this.logoutUser() }}>
                        {localization.logoutLink[this.props.language]}
                    </NavLink>
                </div>
            </div>
        )
    }

    logoutUser() {
        fetch(`${this.serverAddress}/profiles/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(responce => {
            return responce.json()
        }).then(data => {
            if (data.error != null) {
                throw new Error(data.error);
            } else{
                localStorage.setItem('user', JSON.stringify({}));
            }
        }).catch(err => alert("Error: " + err.message));
    }
}

const storeToProps = (store)=>({
    serverAddress: store.serverAddress
})

export default connect(storeToProps, null)(PatientSideMenuElement);