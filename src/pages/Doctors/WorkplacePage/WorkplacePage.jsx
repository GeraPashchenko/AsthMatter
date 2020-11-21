import React, {useState} from "react";
import {LocalizationButton, PageTitle} from '../../../shared/styles/HeaderStyles'
import {changeLang, changeLocalization} from '../../../localization/localizationFunctions';
import localization from "../../../localization/localization.json";
import {DivFlexColumn, DivWithShift} from "../../InhalerPage/InhalerForm/StyledComponent";
import '../../../shared/styles/pageStyles.css';
import DoctorSideMenu from "../../../menus/DoctorSideMenu";
import WorkplaceForm from './WorkplaceForm';

function WorkPlacePage(props) {

  let language = localStorage.getItem('language');
  let [newLang, setLang] = useState(language);

  return (
    <>
      <DoctorSideMenu language={newLang}/>

      <DivWithShift>
        <DivFlexColumn>
          <PageTitle>{localization.doctorPage.title[newLang]}</PageTitle>
          <WorkplaceForm language={newLang}/>
        </DivFlexColumn>
      </DivWithShift>

      <LocalizationButton onClick={() => changeLocalization(setLang, newLang) }>
        {changeLang(newLang)}
      </LocalizationButton>
    </>
  )
}

export default WorkPlacePage;