import React from "react";
import { connect } from "react-redux";
import localization from "../localization/localization.json";
import './style.css';
import { Redirect, NavLink } from 'react-router-dom';

class PatientSideMenuElement extends React.Component {
    constructor(props) {
        super();
        this.serverAddress = props.serverAddress;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.state = { redirect : false };
        this.setState = this.setState.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
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
                    <input type='button' className="links logout logoutButton" onClick={this.logoutUser} value={localization.logoutLink[this.props.language]}/>
                    { this.state.redirect === true ? <Redirect to='/' /> : ''}
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
                localStorage.removeItem('language');
                localStorage.removeItem('role');
                localStorage.setItem('user', JSON.stringify({}));
                this.setState({redirect : true});
            }
        }).catch(err => alert("Error: " + err.message));
    }
}

const storeToProps = (store)=>({
    serverAddress: store.serverAddress
})

export default connect(storeToProps, null)(PatientSideMenuElement);