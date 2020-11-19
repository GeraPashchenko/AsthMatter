import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import { setLocalization } from "../../redux/actions";
import localization from "../../localization/localization.json";
import { DivFlexColumn, DivWithShift } from "../InhalerPage/InhalerForm/StyledComponent";
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import '../../shared/styles/pageStyles.css';
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import AdminSideMenu from '../../menus/AdminSideMenu';

function ChangePasswordPage(props) {
    let user = JSON.parse(localStorage.getItem('user'));
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);

    return (
        <>
            { user.role === 'Patient' ? <PatientSideMenuElement language={newLang} /> : ''}
            { user.role === 'Doctor' ? '' : ''}
            { user.role === 'Admin' ? <AdminSideMenu language={newLang} /> : ''}

            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization)}>
                {changeLang(newLang)}
            </LocalizationButton>
            <DivWithShift>
                <DivFlexColumn>
                    <PageTitle>{localization.changePasswordPage.title[newLang]}</PageTitle>
                    <ChangePasswordForm language={newLang}/>
                </DivFlexColumn>
            </DivWithShift>
        </>
    )
}

const storeToProps = (store) => ({
    language: store.language
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang))
});

export default connect(storeToProps, dispatchToProps)(ChangePasswordPage);