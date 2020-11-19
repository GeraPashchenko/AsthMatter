import React from "react";
import { Form, LabelDivForm, InputForm, TextArea, FormFieldDiv, BloodList, LabelField, Name } from "../MedCardInformationForm/StyledComponent";
import { setUser } from "../../../redux/actions";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';

class MedCardInformationForm extends React.Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.user = props.user;
        this.setUser = props.setUser;
        this.state = { formData: {} }
    }

    handleSubmit(event) {
        // id, userId - оба не менять, birthday, height, weight, bloodGroup, allergies, emergencyContact, adddress. 

        event.preventDefault();
        const data = {
            id : event.target.id.value,
            userId : event.target.userId.value,
            birthday: event.target.birthday.value,
            height: event.target.height.value,
            weight: event.target.weight.value,
            bloodGroup: event.target.bloodGroup.value,
            allergies: event.target.allergies.value,
            emergencyContact: event.target.emergencyContact.value,
            address: event.target.address.value
        }

        fetch(`https://localhost:5001/patients/edit/${this.user.id}`, {
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
          }).catch(err => alert("Error: " + err.message));
    }

    getFormData(userId) {
        fetch(`https://localhost:5001/patients/${userId}`, {
            method: 'GET',
            credentials: 'include',
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
                data.birthday = data.birthday.split("T")[0];
                this.setState(() => ({ formData: data }));
            }
        }).catch(err => alert("Error: " + err.message));
    }

    async componentDidMount() {
        this.getFormData(this.user.id);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <input type="hidden" name={'id'} value={this.state.formData.id} />
                <input type="hidden" name={'userId'} value={this.state.formData.userId} />
                <Name><b><i>{`${this.state.formData.surname} ${this.state.formData.name} ${this.state.formData.patronymic !== null ? this.state.formData.patronymic : ''}`}</i></b></Name>
                <br></br>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.MedCard.medCardInformationPage.birthday[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <InputForm type='date' name={'birthday'} defaultValue={this.state.formData.birthday} max={new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split("T")[0]}/>
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.MedCard.medCardInformationPage.height[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <InputForm type='number' name={'height'} required defaultValue={this.state.formData.height} min="0" max="250" />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.MedCard.medCardInformationPage.weight[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <InputForm type='number' name={'weight'} defaultValue={this.state.formData.weight} min="0" max="250" />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.MedCard.medCardInformationPage.emergencyContact[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <InputForm type='tel' name={'emergencyContact'} defaultValue={this.state.formData.emergencyContact} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.MedCard.medCardInformationPage.bloodGroup[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <BloodList name={'bloodGroup'} defaultValue={this.state.formData.bloodGroup}>
                        <option key='0 (I)' value='0 (I)' selected={this.state.formData.bloodGroup == '0 (I)'}>0 (I)</option>
                        <option key='A (II)' value='A (II)' selected={this.state.formData.bloodGroup == 'A (II)'}>A (II)</option>
                        <option key='B (III)' value='B (III)' selected={this.state.formData.bloodGroup == 'B (III)'}>B (III)</option>
                        <option key='AB (IV)' value='AB (IV)' selected={this.state.formData.bloodGroup == 'AB (IV)'}>AB (IV)</option>
                    </BloodList >
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.MedCard.medCardInformationPage.allergies[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <TextArea name={'allergies'} defaultValue={this.state.formData.allergies} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.MedCard.medCardInformationPage.address[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <TextArea name={'address'} defaultValue={this.state.formData.address} />
                </FormFieldDiv>
                <br></br>
                <input type="submit" className="button" value={localization.saveButton[this.props.language]} />

            </Form>
        )
    }
}

const storeToProps = (store) => ({
    language: store.language,
    user: store.user
});

const dispatcherToProps = (dispatcher) => ({
    setUser: (user) => dispatcher(setUser(user))
});

export default connect(storeToProps, dispatcherToProps)(MedCardInformationForm);
