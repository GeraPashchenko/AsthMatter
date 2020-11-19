import React from "react";
import { Redirect } from 'react-router-dom';
import { FormHeader } from "../../../shared/styles/FormStyles.js";
import { SignInForm, SignInFormFieldDiv, SignInLabelField, SignInInput, SignInLink } from './StyledComponent';
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';

class SignInFormElement extends React.Component {
  constructor(props) {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.serverAddress = props.serverAddress;
    this.language = localStorage.getItem('language') || 'ua';
    this.state = { doctor: false, patient: false, admin: false };
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      login: event.target.email.value,
      password: event.target.password.value
    }

    fetch(`${this.serverAddress}/profiles/authenticate`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(responce => {
      return responce.json()
    }).then(data => {
      if (data.error != null) {
        throw new Error(data.error);
      }
      else {
        localStorage.setItem('user', JSON.stringify({ id: data.id, login: data.login, role: data.role, language : data.language }));
        localStorage.setItem('language', data.language);

        switch (data.role) {
          case 'Doctor': this.setState({ doctor: true });
            break;
          case 'Patient': this.setState({ patient: true });
            break;
          case 'Admin': this.setState({ admin: true });
            break;
          default: break;
        }
      }
    }).catch(err => alert("Error: " + err.message));
  }

  render() {
    return (
      <SignInForm onSubmit={this.handleSubmit}>

        <FormHeader>{localization.signInPage.signIn[this.language]}</FormHeader>

        <SignInFormFieldDiv>
          <SignInLabelField>{localization.signInPage.email[this.language]}</SignInLabelField>
          <SignInInput name={'email'} type='email' required />
        </SignInFormFieldDiv>

        <SignInFormFieldDiv>
          <SignInLabelField>{localization.signInPage.password[this.language]}</SignInLabelField>
          <SignInInput name={'password'} required />
        </SignInFormFieldDiv>

        <SignInLink to={'/signUp'}>{localization.signInPage.note[this.language]} </SignInLink>
        <input type="submit" className="button" value={localization.signInPage.signInButton[this.language]}/>
        {this.state.doctor === true ? (<Redirect to="/login1" />) : null}
        {this.state.patient === true ? (<Redirect to="/inhaler" />) : null}         {/* attacksDiary */}
        {this.state.admin === true ? (<Redirect to="/mainboard" />) : null}
      </SignInForm>
    )
  }
}

const storeToProps = (store) => ({
  serverAddress: store.serverAddress,
});

export default connect(storeToProps, null)(SignInFormElement);
