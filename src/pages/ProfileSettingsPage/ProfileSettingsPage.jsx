import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import { setLocalization, setUser } from "../../redux/actions";
import localization from "../../localization/localization.json";
import { DivFlexColumn, DivWithShift } from "../InhalerPage/InhalerForm/StyledComponent";
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import ProfileSettingsForm from "./ProfileSettingsForm/ProfileSettingsForm";
import { Link, Redirect } from "react-router-dom";
import '../../shared/styles/pageStyles.css';


function ProfileSettingsPage(props) {
    const { language, setLocalization, user, setUser } = props;
    let [newLang, setLang] = useState(language);
    let [redirect, setRedirect] = useState(false);

    return (
        <>
            <PatientSideMenuElement language={newLang} />
            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization)}>
                {changeLang(newLang)}
            </LocalizationButton>
            <DivWithShift>
                <DivFlexColumn>
                    <PageTitle>{localization.profileSettingsPage.title[language]}</PageTitle>
                    <ProfileSettingsForm language={newLang} />
                </DivFlexColumn>
                <DivFlexColumn>
                    <Link to="/changePassword" className="sideButton changePasswordButton">
                        {localization.profileSettingsPage.changePasswordButton[language]}
                    </Link>
                    <Link className="sideButton deleteProfileButton" onClick={() => deleteProfile(language, setUser, setRedirect, user.id)}>
                        {localization.profileSettingsPage.deleteProfileButton[language]}
                    </Link>
                    {redirect === true ? <Redirect to="/" /> : null}
                </DivFlexColumn>
            </DivWithShift>
        </>
    )
}

function deleteProfile(language, setUser, setRedirect, userId) {
    let deleteFlag = window.confirm(localization.profileSettingsPage.confirmDeleteting[language]);
    if (deleteFlag) {
        fetch(`https://localhost:5001/profiles/delete/${userId}`, {
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
                setUser({});
                setRedirect(true);
            }
        }).catch(err => alert("Error: " + err.message));
    }
}

const storeToProps = (store) => ({
    language: store.language,
    user: store.user
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang)),
    setUser: (user) => dispatcher(setUser(user))
});

export default connect(storeToProps, dispatchToProps)(ProfileSettingsPage);