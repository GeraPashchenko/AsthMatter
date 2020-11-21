import React from "react";
import { connect } from "react-redux";
import localization from "../localization/localization.json";
import './style.css';
import { NavLink , Redirect } from 'react-router-dom';
import download from 'downloadjs';

class AdminSideMenuElement extends React.Component {
    constructor(props) {
        super();
        this.serverAddress = props.serverAddress;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.state = { redirect : false };
        this.setState = this.setState.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.dataBackup = this.dataBackup.bind(this);
    }

    render() {
        return (
            <div className="sideMenu sideMenu1">
                <div className="siteTitle">asthMatter</div>
                <div id="sideMenu" className="flexDiv">
                    <NavLink to="/mainboard" className="links attacksDiary" activeClassName="current">
                        {localization.sideMenuAdmin.mainBoard[this.props.language]}
                    </NavLink>
                    <NavLink to="/patients" className="links medCardInformation" activeClassName="current">
                        {localization.sideMenuAdmin.patients[this.props.language]}
                    </NavLink>
                    <NavLink to="/doctors" className="links medCardRecords" activeClassName="current">
                        {localization.sideMenuAdmin.doctors[this.props.language]}
                    </NavLink>
                    <NavLink to="/admins" className="links medicines" activeClassName="current">
                        {localization.sideMenuAdmin.admins[this.props.language]}
                    </NavLink>
                    <NavLink to="/hospitals" className="links doctor" activeClassName="current">
                        {localization.sideMenuAdmin.hospitals[this.props.language]}
                    </NavLink>
                    <NavLink to="/profileSettings" className="links inhaler" activeClassName="current">
                        {localization.sideMenuAdmin.profileSettings[this.props.language]}
                    </NavLink>
                    <input type='button' className="links profileSettings logoutButton" onClick={this.dataBackup} value={localization.sideMenuAdmin.dataBackup[this.props.language]}/>
                    <input type='button' className="links logout logoutButton" onClick={this.logoutUser} value={localization.logoutLink[this.props.language]}/>
                    { this.state.redirect === true ? <Redirect to='/' /> : ''}
                </div>
            </div>
        )
    }

    dataBackup(){
        fetch(`${this.serverAddress}/admins/db`, {
            method: 'GET',
            credentials: 'include',
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*'
            }
        }).then(function(resp) {
            return resp.blob();
          }).then(function(blob) {
            download(blob, 'DataBackup' + new Date().toISOString().split("T")[0] + ".bak");
          });
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

export default connect(storeToProps, null)(AdminSideMenuElement);