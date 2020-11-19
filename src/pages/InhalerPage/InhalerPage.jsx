import React, {useState} from "react";
import {LocalizationButton, PageTitle} from '../../shared/styles/HeaderStyles'
import {connect} from "react-redux";
import {changeLang, changeLocalization} from "../../localization/localizationFunctions";
import localization from '../../localization/localization.json';
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import InhalerForm from "./InhalerForm/InhalerForm";
import {DivFlexColumn, DivWithShift} from "./InhalerForm/StyledComponent";

function InhalerPage(props) {
  let language = JSON.parse(localStorage.getItem('language'));
  let [newLang, setLang] = useState(language);

  return (
    <>
      <PatientSideMenuElement language={newLang}/>
      <LocalizationButton onClick={() => {
        changeLocalization(setLang, newLang)
      }}>{changeLang(newLang)}</LocalizationButton>
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

export default connect(storeToProps, null)(InhalerPage);