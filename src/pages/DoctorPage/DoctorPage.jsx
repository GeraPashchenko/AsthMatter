import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import { setLocalization, setUser } from "../../redux/actions";
import localization from "../../localization/localization.json";
import { DivFlexColumn, DivWithShift } from "../InhalerPage/InhalerForm/StyledComponent";
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import '../../shared/styles/pageStyles.css';
import DoctorForm from '../DoctorPage/DoctorForm/DoctorForm';

function DoctorPage(props) {
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
                    <PageTitle>{localization.doctorPage.title[language]}</PageTitle>
                    <DoctorForm language={newLang} />
                </DivFlexColumn>
            </DivWithShift>
        </>
    )
}

const storeToProps = (store) => ({
    language: store.language,
    user: store.user
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang)),
    setUser: (user) => dispatcher(setUser(user))
});

export default connect(storeToProps, dispatchToProps)(DoctorPage);