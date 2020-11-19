import React, { useState } from "react";
import { LocalizationButton, SignInHeaderText } from '../../shared/styles/HeaderStyles'
import SignInForm from './SignInForm/SignInForm'
import '../../shared/styles/body.css';
import { connect } from "react-redux";
import { changeLang, changeLocalization } from "../../localization/localizationFunctions";

function SignInPage(props) {

  let language = localStorage.getItem('language') || 'ua';
  let [newLang, setLang] = useState(language);

  return (
    <>
      <LocalizationButton onClick={() => { changeLocalization(setLang, newLang) }}>{changeLang(newLang)}</LocalizationButton>
      <SignInHeaderText> asthMatter </SignInHeaderText>
      <SignInForm language={newLang} />

    </>
  )
}

const storeToProps = (store) => ({
  language: store.language
});

export default connect(storeToProps, null)(SignInPage);