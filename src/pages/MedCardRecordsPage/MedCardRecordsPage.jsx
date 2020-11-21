import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import localization from "../../localization/localization.json";
import { DivFlexColumn } from "../InhalerPage/InhalerForm/StyledComponent";
import { DivWithShift } from './MedCardRecord/StyledComponent';
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import MedCardRecords from "./MedCardRecords";
import '../../shared/styles/pageStyles.css';
import DoctorSideMenu from "../../menus/DoctorSideMenu";

function MedCardRecordsPage(props) {
  let language = localStorage.getItem('language');
  let [newLang, setLang] = useState(language);
  let id = props.match.params.id !== undefined ? props.match.params.id : null;
  let user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      { user.role === 'Patient' ? <PatientSideMenuElement language={newLang} /> : ''}
      { user.role === 'Doctor' ? <DoctorSideMenu language={newLang} /> : ''}
      <DivWithShift>
        <DivFlexColumn>
          <PageTitle>{localization.MedCard.medCardRecordsPage.title[newLang]}</PageTitle>
          <MedCardRecords language={newLang} id={id} />
        </DivFlexColumn>
      </DivWithShift>
      <LocalizationButton onClick={() => changeLocalization(setLang, newLang)}>
        {changeLang(newLang)}
      </LocalizationButton>
    </>
  )
}

export default MedCardRecordsPage;