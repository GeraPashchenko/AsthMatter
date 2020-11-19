import React, { useState } from "react";
import { LocalizationButton } from '../../shared/styles/HeaderStyles'
import { SignUpHeaderText } from "../../shared/styles/HeaderStyles";
import SignUpFormElement from "./SignUpForm/SignUpForm";
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import { setLocalization } from "../../redux/actions";
import '../../shared/styles/body.css';

function SignUpPage(props) {

  let language = localStorage.getItem('language') || 'ua';
  let [newLang, setLang] = useState(language);

  return (
    <>
      <LocalizationButton onClick={() => { changeLocalization(setLang, newLang) }}>{changeLang(newLang)}</LocalizationButton>
      <SignUpHeaderText> asthMatter </SignUpHeaderText>
      <SignUpFormElement language={newLang} />
    </>
  )
}

export default SignUpPage;


