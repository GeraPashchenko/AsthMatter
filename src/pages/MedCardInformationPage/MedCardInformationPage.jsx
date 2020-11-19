import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import localization from "../../localization/localization.json";
import { DivFlexColumn, DivWithShift } from "../InhalerPage/InhalerForm/StyledComponent";
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import MedCardInformationForm from "./MedCardInformationForm/MedCardInformationForm";
import '../../shared/styles/pageStyles.css';


function MedCardInformationPage(props) {
  let user = JSON.parse(localStorage.getItem('user'));
  let language = localStorage.getItem('language');

    let [newLang, setLang] = useState(language);

    return (
        <>
            <PatientSideMenuElement language={newLang} />
            <LocalizationButton onClick={() => changeLocalization(setLang, newLang)}>
                {changeLang(newLang)}
            </LocalizationButton>
            <DivWithShift>
                <DivFlexColumn>
                    <PageTitle>{localization.MedCard.medCardInformationPage.title[language]}</PageTitle>
                    <MedCardInformationForm language={newLang} />
                </DivFlexColumn>
            </DivWithShift>
        </>
    )
}

export default MedCardInformationPage;