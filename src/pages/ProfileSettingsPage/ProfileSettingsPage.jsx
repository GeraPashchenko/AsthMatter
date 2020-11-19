import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import localization from "../../localization/localization.json";
import { DivFlexColumn, DivWithShift } from "../InhalerPage/InhalerForm/StyledComponent";
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import ProfileSettingsForm from "./ProfileSettingsForm/ProfileSettingsForm";
import { Link, Redirect } from "react-router-dom";
import '../../shared/styles/pageStyles.css';
import AdminSideMenu from '../../menus/AdminSideMenu';

function ProfileSettingsPage(props) {
    let user = JSON.parse(localStorage.getItem('user'));
    let language = localStorage.getItem('language');
    let serverAddress = props.serverAddress;
    let [newLang, setLang] = useState(language);
    let [redirect, setRedirect] = useState(false);

    return (
        <>
            { user.role === 'Patient' ? <PatientSideMenuElement language={newLang} /> : ''}
            { user.role === 'Doctor' ? '' : ''}
            { user.role === 'Admin' ? <AdminSideMenu language={newLang} /> : ''}

            <LocalizationButton onClick={() => changeLocalization(setLang, newLang)}>
                {changeLang(newLang)}
            </LocalizationButton>
            <DivWithShift>
                <DivFlexColumn>
                    <PageTitle>{localization.profileSettingsPage.title[newLang]}</PageTitle>
                    <ProfileSettingsForm language={newLang} />
                </DivFlexColumn>
                <DivFlexColumn>
                    <Link to="/changePassword" className="sideButton changePasswordButton">
                        {localization.profileSettingsPage.changePasswordButton[newLang]}
                    </Link>
                    <Link className="sideButton deleteProfileButton" onClick={() => deleteProfile(newLang, setRedirect, user.id, serverAddress)}>
                        {localization.profileSettingsPage.deleteProfileButton[newLang]}
                    </Link>
                    {redirect === true ? <Redirect to="/" /> : null}
                </DivFlexColumn>
            </DivWithShift>
        </>
    )
}

function deleteProfile(language, setRedirect, userId, serverAddress) {
    let deleteFlag = window.confirm(localization.profileSettingsPage.confirmDeleteting[language]);
    if (deleteFlag) {
        fetch(`${serverAddress}/profiles/delete/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(responce => {
            return responce.json()
        }).then(data => {
            if (data.error != null) {
                throw new Error(data.error);
            } else {
                setRedirect(true);
                localStorage.setItem('user', JSON.stringify({}))
            }
        }).catch(err => alert("Error: " + err.message));
    }
}

const storeToProps = (store) => ({
    serverAddress: store.serverAddress
});

export default connect(storeToProps, null)(ProfileSettingsPage);