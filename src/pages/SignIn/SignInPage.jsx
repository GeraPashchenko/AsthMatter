import React, { useState } from "react";
import { LocalizationButton, SignInHeaderText } from '../../shared/styles/HeaderStyles'
import SignInForm from './SignInForm/SignInForm'
import '../../shared/styles/body.css';
import { connect } from "react-redux";
import { changeLang, changeLocalization } from "../../localization/localizationFunctions";
import { setLocalization } from "../../redux/actions";

function SignInPage(props) {
  const { language, setLocalization } = props;
  let [newLang, setLang] = useState(language);

  return (
    <>
      <LocalizationButton onClick={() => { changeLocalization(setLang, newLang, setLocalization) }}>{changeLang(newLang)}</LocalizationButton>
      <SignInHeaderText> asthMatter </SignInHeaderText>
      <SignInForm language={newLang} />

    </>
  )
}

const storeToProps = (store) => ({
  language: store.language
});

const dispatchToProps = (dispatcher) => ({
  setLocalization: (lang) => dispatcher(setLocalization(lang))
});

export default connect(storeToProps, dispatchToProps)(SignInPage);