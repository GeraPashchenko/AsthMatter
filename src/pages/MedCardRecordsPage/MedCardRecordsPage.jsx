import React, {useState} from "react";
import {LocalizationButton, PageTitle} from '../../shared/styles/HeaderStyles'
import {changeLang, changeLocalization} from '../../localization/localizationFunctions';
import localization from "../../localization/localization.json";
import { DivFlexColumn } from "../InhalerPage/InhalerForm/StyledComponent";
import { DivWithShift } from './MedCardRecord/StyledComponent';
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import MedCardRecords from "./MedCardRecords";
import '../../shared/styles/pageStyles.css';


function MedCardRecordsPage(props) {
  let language = JSON.parse(localStorage.getItem('language'));
  let [newLang, setLang] = useState(language);

  return (
    <>
      <PatientSideMenuElement language={newLang}/>
      <LocalizationButton onClick={() => changeLocalization(setLang, newLang)}>
        {changeLang(newLang)}
      </LocalizationButton>
      <DivWithShift>
        <DivFlexColumn>
          <PageTitle>{localization.MedCard.medCardRecordsPage.title[language]}</PageTitle>
          <MedCardRecords language={newLang}/>
        </DivFlexColumn>
      </DivWithShift>
    </>
  )
}

export default MedCardRecordsPage;