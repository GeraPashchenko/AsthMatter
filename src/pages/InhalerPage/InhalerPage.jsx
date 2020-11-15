import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from "../../localization/localizationFunctions";
import { setLocalization } from "../../redux/actions";
import localization from '../../localization/localization.json';
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import InhalerForm from "./InhalerForm/InhalerForm";
import { DivFlexColumn, DivWithShift } from "./InhalerForm/StyledComponent";

function InhalerPage(props) {
    const { language, setLocalization } = props;
    let [newLang, setLang] = useState(language);

    return (
        <>
            <PatientSideMenuElement language={ newLang }/>
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
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang)),
});

export default connect(storeToProps, dispatchToProps)(InhalerPage);