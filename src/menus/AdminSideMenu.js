import React from "react";
import { connect } from "react-redux";
import localization from "../localization/localization.json";
import './style.css';
import { NavLink } from 'react-router-dom';

class AdminSideMenuElement extends React.Component {
    constructor(props) {
        super();
        this.serverAddress = props.serverAddress;
        this.language = localStorage.getItem('language');
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    render() {
        return (
            <div className="sideMenu sideMenu1">
                <div className="siteTitle">asthMatter</div>
                <div id="sideMenu" className="flexDiv">
                    <NavLink to="/mainboard" className="links attacksDiary" activeClassName="current">
                        {localization.sideMenuAdmin.mainBoard[this.language]}
                    </NavLink>
                    <NavLink to="/patients" className="links medCardInformation" activeClassName="current">
                        {localization.sideMenuAdmin.patients[this.language]}
                    </NavLink>
                    <NavLink to="/lala" className="links medCardRecords" activeClassName="current">
                        {localization.sideMenuAdmin.doctors[this.language]}
                    </NavLink>
                    <NavLink to="/lala" className="links medicines" activeClassName="current">
                        {localization.sideMenuAdmin.admins[this.language]}
                    </NavLink>
                    <NavLink to="/lala" className="links doctor" activeClassName="current">
                        {localization.sideMenuAdmin.hospitals[this.language]}
                    </NavLink>
                    <NavLink to="/profileSettings" className="links inhaler" activeClassName="current">
                        {localization.sideMenuAdmin.profileSettings[this.language]}
                    </NavLink>
                    <NavLink to="/lala" className="links profileSettings" activeClassName="current">
                        {localization.sideMenuAdmin.dataBackup[this.language]}
                    </NavLink>
                    <NavLink to="/" className="links logout" onClick={() => { this.logoutUser() }}>
                        {localization.logoutLink[this.language]}
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

export default connect(storeToProps, null)(AdminSideMenuElement);