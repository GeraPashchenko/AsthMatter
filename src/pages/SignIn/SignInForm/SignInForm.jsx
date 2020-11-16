import React from "react";
import { Redirect } from 'react-router-dom';
import { FormHeader } from "../../../shared/styles/FormStyles.js";
import { SignInForm, SignInFormFieldDiv, SignInLabelField, SignInInput, SignInLink } from './StyledComponent';
import { setUser } from "../../../redux/actions";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';

class SignInFormElement extends React.Component {
  constructor(props) {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUser = props.setUser;
    this.state = { doctor: false, patient: false, admin: false };
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      login: event.target.email.value,
      password: event.target.password.value
    }

    fetch('https://localhost:5001/profiles/authenticate', {
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
        this.setUser({ id: data.id, login: data.login, role: data.role, language: data.language });
        switch (data.role) {
          case 'Doctor': this.setState({ doctor: true });
            break;
          case 'Patient': this.setState({ patient: true });
            break;
          case 'Admin': this.setState({ admin: true });
            break;
          default: break;
        };
      }
    }).catch(err => alert("Error: " + err.message));
  }

  render() {
    return (
      <SignInForm onSubmit={this.handleSubmit}>

        <FormHeader>{localization.signInPage.signIn[this.props.language]}</FormHeader>

        <SignInFormFieldDiv>
          <SignInLabelField>{localization.signInPage.email[this.props.language]}</SignInLabelField>
          <SignInInput name={'email'} type='email' required />
        </SignInFormFieldDiv>

        <SignInFormFieldDiv>
          <SignInLabelField>{localization.signInPage.password[this.props.language]}</SignInLabelField>
          <SignInInput name={'password'} required />
        </SignInFormFieldDiv>

        <SignInLink to={'/signUp'}>{localization.signInPage.note[this.props.language]} </SignInLink>
        <input type="submit" className="button" value={localization.signInPage.signInButton[this.props.language]}/>
        {this.state.doctor === true ? (<Redirect to="/login1" />) : null}
        {this.state.patient === true ? (<Redirect to="/inhaler" />) : null}         {/* attacksDiary */}
        {this.state.admin === true ? (<Redirect to="/login3" />) : null}
      </SignInForm>
    )
  }
}

const dispatcherToProps = (dispatcher) => ({
  setUser: (user) => dispatcher(setUser(user))
});

export default connect(null, dispatcherToProps)(SignInFormElement);
