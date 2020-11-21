import React from "react";
import { connect } from "react-redux";
import localization from "../localization/localization.json";
import './style.css';
import { NavLink , Redirect } from 'react-router-dom';

class DoctorSideMenu extends React.Component {
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
                    <NavLink to="/myPatients" className="links attacksDiary" activeClassName="current">
                        {localization.sideMenuDoctor.myPatients[this.props.language]}
                    </NavLink>
                    <NavLink to="/workplace" className="links medCardInformation" activeClassName="current">
                        {localization.sideMenuDoctor.workplace[this.props.language]}
                    </NavLink>
                    <NavLink to="/profileSettings" className="links medCardRecords" activeClassName="current">
                        {localization.sideMenuDoctor.profileSettings[this.props.language]}
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

export default connect(storeToProps, null)(DoctorSideMenu);