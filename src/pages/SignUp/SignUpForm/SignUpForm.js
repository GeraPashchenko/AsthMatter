import React from "react";
import { Redirect } from 'react-router-dom';
import {
  FormHeader,
  FormFooter,
  InputForm,
  LabelDivForm,
  FormFieldDiv,
  LabelField
} from "../../../shared/styles/FormStyles.js";
import { SignUpList, SignUpForm, SignUpLabelRequiredStar } from './StyledComponent';
import SignUpTimeZone from "../SignUpTimeZone/SignUpTimeZone";
import { setUser } from "../../../redux/actions";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';

class SignUpFormElement extends React.Component {
  constructor(props) {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.user = JSON.parse(localStorage.getItem('user'));
    this.serverAddress = props.serverAddress;
    this.language = localStorage.getItem('language') || 'ua';
    this.state = { redirect: false }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: event.target.firstName.value,
      surname: event.target.lastName.value,
      patronymic: event.target.patronymic.value,
      phone: event.target.phone.value,
      login: event.target.email.value,
      password: event.target.password.value,
      gender: (event.target.gender.value === localization.registerPage.genderMan[this.language]) ? 'M' : 'F',
      roleName: (event.target.role.value === localization.registerPage.doctor[this.language]) ? 'Doctor' : 'Patient',
      timezoneinfoid: event.target.timeZone.value.split(" (")[0],
      localization: (event.target.language.value === localization.changeLanguageOptions['en']) ? 'en' : 'ua'
    }

    fetch(`${this.serverAddress}/profiles/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(responce => {
      return responce.json()
    }).then(data => {
      if (data.error != null) {
        throw new Error(data.error);
      }
      else {
        localStorage.setItem('user', JSON.stringify({ id: data.id, login: data.login, role: data.role, language : data.language }));
        localStorage.setItem('language', data.language);

        this.setUser({ id: data.id, login: data.login, role: data.role, language : data.language });
        this.setState({ redirect: true });
      }
    }).catch(err => alert("Error: " + err.message));
  }

  render() {
    return (
      <SignUpForm onSubmit={this.handleSubmit}>

        <FormHeader> {localization.registerPage.register[this.language]} </FormHeader>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.firstName[this.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <InputForm name={'firstName'} required maxLength='250' minLength='3'/>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.lastName[this.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <InputForm name={'lastName'} required maxLength='250' minLength='3'/>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.patronymic[this.language]}</LabelField>
          </LabelDivForm>
          <InputForm name={'patronymic'} maxLength='250'/>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.phone[this.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <InputForm name={'phone'} required />
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.email[this.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <InputForm name={'email'} type='email' required />
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.password[this.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <InputForm type='password' name={'password'} required maxLength='50' minLength='6'/>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.gender[this.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <SignUpList name={'gender'} required>
            <option> {localization.registerPage.genderMan[this.language]} </option>
            <option> {localization.registerPage.genderWoman[this.language]}</option>
          </SignUpList >
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.role[this.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <SignUpList name={'role'} required>
            <option> {localization.registerPage.doctor[this.language]}</option>
            <option> {localization.registerPage.patient[this.language]}</option>
          </SignUpList>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.timezone[this.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <SignUpTimeZone />
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.language[this.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <SignUpList name={'language'} required>
            <option> {localization.changeLanguageOptions['en']} </option>
            <option> {localization.changeLanguageOptions['ua']} </option>
          </SignUpList>
        </FormFieldDiv>

        <FormFooter> {localization.registerPage.note[this.language]} </FormFooter>
        <input type="submit" className="button" value={localization.registerPage.createButton[this.language]} />
        {this.state.redirect === true ? (<Redirect to="/inhaler" />) : null}

      </SignUpForm>
    )
  }
}

const storeToProps = (store) => ({
  serverAddress: store.serverAddress,
});

export default connect(storeToProps, null)(SignUpFormElement);
