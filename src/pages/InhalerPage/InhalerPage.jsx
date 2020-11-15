import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from "../../localization/localizationFunctions";
import { setLocalization, setUser } from "../../redux/actions";
import localization from '../../localization/localization.json';
import PatientSideMenu from "../../menus/PatientSideMenu";
import InhalerForm from "./InhalerForm/InhalerForm";
import { DivFlexColumn, DivWithShift } from "./InhalerForm/StyledComponent";

function InhalerPage(props) {
    const { user, language, setLocalization } = props;
    let [newLang, setLang] = useState(language);

    return (
        <>
            <PatientSideMenu />
            <LocalizationButton onClick={() => { changeLocalization(setLang, newLang, setLocalization) }}>{changeLang(newLang)}</LocalizationButton>
            <DivWithShift>
                <DivFlexColumn>
                    <PageTitle>{localization.inhalerPage.title[language]}</PageTitle>
                    <InhalerForm language={newLang}/>
                </DivFlexColumn>
            </DivWithShift>
        </>
    )
}

const storeToProps = (store) => ({
    language: store.language,
    user: store.user,
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang)),
    setUser : (user) => dispatcher(setUser(user))
});

export default connect(storeToProps, dispatchToProps)(InhalerPage);