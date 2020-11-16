import React, { useState } from "react";
import { LocalizationButton } from '../../shared/styles/HeaderStyles'
import { SignUpHeaderText } from "../../shared/styles/HeaderStyles";
import SignUpFormElement from "./SignUpForm/SignUpForm";
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import { setLocalization } from "../../redux/actions";
import '../../shared/styles/body.css';

function SignUpPage(props) {
  const { language, setLocalization } = props;
  let [newLang, setLang] = useState(language);

  return (
    <>
      <LocalizationButton onClick={() => { changeLocalization(setLang, newLang, setLocalization) }}>{changeLang(newLang)}</LocalizationButton>
      <SignUpHeaderText> asthMatter </SignUpHeaderText>
      <SignUpFormElement language={newLang} />
    </>
  )
}

const storeToProps = (store) => ({
  language: store.language
});

const dispatchToProps = (dispatcher) => ({
  setLocalization: (lang) => dispatcher(setLocalization(lang))
});

export default connect(storeToProps, dispatchToProps)(SignUpPage);