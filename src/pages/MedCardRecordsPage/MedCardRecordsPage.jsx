import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import { setLocalization, setUser } from "../../redux/actions";
import localization from "../../localization/localization.json";
import { DivFlexColumn } from "../InhalerPage/InhalerForm/StyledComponent";
import { DivWithShift } from './MedCardRecord/StyledComponent';
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import MedCardRecords from "./MedCardRecords";
import '../../shared/styles/pageStyles.css';


function MedCardRecordsPage(props) {
    const { language, setLocalization } = props;
    let [newLang, setLang] = useState(language);

    return (
        <>
            <PatientSideMenuElement language={newLang} />
            <DivWithShift>
                <DivFlexColumn>
                    <PageTitle>{localization.MedCard.medCardRecordsPage.title[language]}</PageTitle>
                    <MedCardRecords language={newLang} />
                </DivFlexColumn>
            </DivWithShift>
            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization)}>
                {changeLang(newLang)}
            </LocalizationButton>
        </>
    )
}

const storeToProps = (store) => ({
    language: store.language,
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang)),
});

export default connect(storeToProps, dispatchToProps)(MedCardRecordsPage);