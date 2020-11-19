import React, {useState} from "react";
import {LocalizationButton, PageTitle} from '../../shared/styles/HeaderStyles'
import {changeLang, changeLocalization} from '../../localization/localizationFunctions';
import localization from "../../localization/localization.json";
import {DivFlexColumn, DivWithShift} from "../InhalerPage/InhalerForm/StyledComponent";
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import '../../shared/styles/pageStyles.css';
import DoctorForm from '../DoctorPage/DoctorForm/DoctorForm';

function DoctorPage(props) {

  let language = localStorage.getItem('language');

  let [newLang, setLang] = useState(language);

  return (
    <>
      <PatientSideMenuElement language={newLang}/>
      <LocalizationButton onClick={() => changeLocalization(setLang, newLang)}>
        {changeLang(newLang)}
      </LocalizationButton>
      <DivWithShift>
        <DivFlexColumn>
          <PageTitle>{localization.doctorPage.title[language]}</PageTitle>
          <DoctorForm language={newLang}/>
        </DivFlexColumn>
      </DivWithShift>
    </>
  )
}

export default DoctorPage;