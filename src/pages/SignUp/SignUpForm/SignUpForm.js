import React from "react";
import {Redirect} from 'react-router-dom';
import {
  FormHeader,
  FormButton,
  FormFooter,
  InputForm,
  LabelDivForm,
  FormFieldDiv,
  LabelField
} from "../../../shared/styles/FormStyles.js";
import {SignUpList, SignUpForm, SignUpLabelRequiredStar} from './StyledComponent';
import SignUpTimeZone from "../SignUpTimeZone/SignUpTimeZone";
import {setUser} from "../../../redux/actions";
import {connect} from "react-redux";
import localization from '../../../localization/localization.json';

class SignUpFormElement extends React.Component {
  constructor(props) {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUser = props.setUser;
    this.state = {redirect: false}
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: event.target.firstName.value,
      surname: event.target.lastName.value,
      patronymic: event.target.patronymic.value || '',
      phone: event.target.phone.value,
      login: event.target.email.value,
      password: event.target.password.value,
      gender: event.target.gender.value,
      roleName: event.target.role.value,
      timezoneinfoid: event.target.timeZone.value || "",
      localization: event.target.language.value
    }
    // this.setState({redirect: true});
    fetch('https://localhost:5001/profiles/register', {
      method: 'POST',
      body: data,
    }).then(responce =>{
      return responce.json
    }).then(data =>{
      this.setUser(data.user);
      this.setState({redirect: true});
    }).catch(err =>{
        alert(err.message);
    });
  }

  render() {
  return (
    <SignUpForm onSubmit={this.handleSubmit}>

      <FormHeader> {localization.registerPage.register[this.props.language]} </FormHeader>

      <FormFieldDiv>
        <LabelDivForm>
          <LabelField>{localization.registerPage.firstName[this.props.language]}</LabelField>
          <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
        </LabelDivForm>
        <InputForm name={'firstName'} required/>
      </FormFieldDiv>

      <FormFieldDiv>
        <LabelDivForm>
          <LabelField>{localization.registerPage.lastName[this.props.language]}</LabelField>
          <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
        </LabelDivForm>
        <InputForm name={'lastName'} required/>
      </FormFieldDiv>

      <FormFieldDiv>
        <LabelDivForm>
          <LabelField>{localization.registerPage.patronymic[this.props.language]}</LabelField>
        </LabelDivForm>
        <InputForm name={'patronymic'}/>
      </FormFieldDiv>

      <FormFieldDiv>
        <LabelDivForm>
          <LabelField>{localization.registerPage.phone[this.props.language]}</LabelField>
          <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
        </LabelDivForm>
        <InputForm name={'phone'} required/>
      </FormFieldDiv>

      <FormFieldDiv>
        <LabelDivForm>
          <LabelField>{localization.registerPage.email[this.props.language]}</LabelField>
          <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
        </LabelDivForm>
        <InputForm name={'email'} type='email' required/>
      </FormFieldDiv>

      <FormFieldDiv>
        <LabelDivForm>
          <LabelField>{localization.registerPage.password[this.props.language]}</LabelField>
          <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
        </LabelDivForm>
        <InputForm name={'password'} required/>
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
          <LabelField>{localization.registerPage.role[this.props.language]}</LabelField>
          <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
        </LabelDivForm>
        <SignUpList name={'role'} required>
          <option> {localization.registerPage.doctor[this.props.language]}</option>
          <option> {localization.registerPage.patient[this.props.language]}</option>
        </SignUpList>
      </FormFieldDiv>

      <FormFieldDiv>
        <LabelDivForm>
          <LabelField>{localization.registerPage.timezone[this.props.language]}</LabelField>
          <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
        </LabelDivForm>
        <SignUpTimeZone/>
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
      <FormButton> {localization.registerPage.createButton[this.props.language]} </FormButton>
      {this.state.redirect === true ? (<Redirect to="/signIn" />) : null}

    </SignUpForm>
  )
}
}

const dispatcherToProps = (dispatcher) => ({
  setUser: (user) => dispatcher(setUser(user))
});

export default connect(null, dispatcherToProps)(SignUpFormElement);
