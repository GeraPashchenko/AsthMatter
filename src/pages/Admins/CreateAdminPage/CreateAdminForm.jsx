import React from "react";
import { Redirect } from 'react-router-dom';
import {
  FormFooter,
  InputForm,
  LabelDivForm,
  FormFieldDiv,
  LabelField
} from "../../../shared/styles/FormStyles.js";
import {Form} from "../../InhalerPage/InhalerForm/StyledComponent";
import {SignUpList, SignUpLabelRequiredStar} from '../../SignUp/SignUpForm/StyledComponent';
import SignUpTimeZone from "../../SignUp/SignUpTimeZone/SignUpTimeZone";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';

class CreateAdminForm extends React.Component {
  constructor(props) {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.serverAddress = props.serverAddress;
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
      gender: (event.target.gender.value === localization.registerPage.genderMan[this.props.language]) ? 'M' : 'F',
      roleName: 'Admin',
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
        this.setState({ redirect: true });
      }
    }).catch(err => alert("Error: " + err.message));
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.firstName[this.props.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <InputForm name={'firstName'} required maxLength='250' minLength='3'/>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.lastName[this.props.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <InputForm name={'lastName'} required maxLength='250' minLength='3'/>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.patronymic[this.props.language]}</LabelField>
          </LabelDivForm>
          <InputForm name={'patronymic'} maxLength='250'/>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.phone[this.props.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <InputForm name={'phone'} required />
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.email[this.props.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <InputForm name={'email'} type='email' required />
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.password[this.props.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <InputForm type='password' name={'password'} required maxLength='50' minLength='6'/>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.gender[this.props.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <SignUpList name={'gender'} required>
            <option> {localization.registerPage.genderMan[this.props.language]} </option>
            <option> {localization.registerPage.genderWoman[this.props.language]}</option>
          </SignUpList >
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.timezone[this.props.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <SignUpTimeZone />
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.registerPage.language[this.props.language]}</LabelField>
            <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
          </LabelDivForm>
          <SignUpList name={'language'} required>
            <option> {localization.changeLanguageOptions['en']} </option>
            <option> {localization.changeLanguageOptions['ua']} </option>
          </SignUpList>
        </FormFieldDiv>

        <FormFooter> {localization.registerPage.note[this.props.language]} </FormFooter>
        <input type="submit" className="button" value={localization.registerPage.createButton[this.props.language]} />
        {this.state.redirect === true ? (<Redirect to="/admins" />) : null}

      </Form>
    )
  }
}

const storeToProps = (store) => ({
  serverAddress: store.serverAddress,
});

export default connect(storeToProps, null)(CreateAdminForm);
