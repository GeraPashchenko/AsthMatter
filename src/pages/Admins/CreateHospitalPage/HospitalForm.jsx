import React from "react";
import { Redirect } from 'react-router-dom';
// import {
//   InputForm,
//   LabelDivForm,
//   FormFieldDiv,
//   LabelField
// } from "../../../shared/styles/FormStyles.js";
import {Form} from "../../InhalerPage/InhalerForm/StyledComponent";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';
import { LabelDivForm, FormFieldDiv, LabelField } from "../../ChangePasswordPage/ChangePasswordForm/StyledComponent";
import { InputForm } from './StyledComponent';

class HospitalForm extends React.Component {
  constructor(props) {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.serverAddress = props.serverAddress;
    this.state = { redirect: false, createPage : props.editPage !== undefined ? false : true, hospital : props.hospital };
    this.setState = this.setState.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      title : event.target.title.value,
      city : event.target.city.value,
      address : event.target.address.value
    };

    fetch(`${this.serverAddress}/hospitals/create`, {
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

  handleSubmitEdit(event){
    event.preventDefault();
    const data = {
      id : event.target.id.value,
      title : event.target.title.value,
      city : event.target.city.value,
      address : event.target.address.value
    };

    fetch(`${this.serverAddress}/hospitals/${this.state.hospital.id}`, {
      method: 'PUT',
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
        this.setState({ hospital : data });
      }
    }).catch(err => alert("Error: " + err.message));
  }

  render() {
    return (
      <Form onSubmit={this.state.createPage ? this.handleSubmit : this.handleSubmitEdit}>
        <input type='hidden' name={'id'} value={this.state.hospital !== undefined ? this.state.hospital.id : ''} />
        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.hospitalData.title[this.props.language]}</LabelField>
          </LabelDivForm>
          <InputForm name={'title'} required defaultValue={this.state.hospital !== undefined ? this.state.hospital.title : null}/>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.hospitalData.city[this.props.language]}</LabelField>
          </LabelDivForm>
          <InputForm name={'city'} required defaultValue={this.state.hospital !== undefined ? this.state.hospital.city : null}/>
        </FormFieldDiv>

        <FormFieldDiv>
          <LabelDivForm>
            <LabelField>{localization.hospitalData.address[this.props.language]}</LabelField>
          </LabelDivForm>
          <InputForm name={'address'} required defaultValue={this.state.hospital !== undefined ? this.state.hospital.address : null}/>
        </FormFieldDiv>

        <input type="submit" className="button" value={
          this.props.buttonValue !== undefined ? this.props.buttonValue : localization.createButton[this.props.language]
          } />
        {this.state.redirect && this.state.createPage ? (<Redirect to="/hospitals" />) : null}

      </Form>
    )
  }
}

const storeToProps = (store) => ({
  serverAddress: store.serverAddress,
});

export default connect(storeToProps, null)(HospitalForm);
