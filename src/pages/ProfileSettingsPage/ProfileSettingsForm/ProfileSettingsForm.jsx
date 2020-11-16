import React from "react";
import {
    FormFooter,
    InputForm,
    LabelDivForm,
    FormFieldDiv,
    LabelField
} from "../../../shared/styles/FormStyles.js";
import { Form } from "../../InhalerPage/InhalerForm/StyledComponent";
import { SignUpList, SignUpLabelRequiredStar } from '../../SignUp/SignUpForm/StyledComponent';
import SignUpTimeZone from "../../SignUp/SignUpTimeZone/SignUpTimeZone";
import { setUser } from "../../../redux/actions";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';

class ProfileSettingsFormElement extends React.Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.user = props.user;
        this.setUser = props.setUser;
        this.state = { formData: {} }
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            id : event.target.id.value,
            name: event.target.firstName.value,
            surname: event.target.lastName.value,
            patronymic: event.target.patronymic.value,
            phone: event.target.phone.value,
            login: event.target.email.value,
            gender: (event.target.gender.value === localization.registerPage.genderMan[this.props.language]) ? 'M' : 'F',
            timezoneinfoid: event.target.timeZone.value.split(" (")[0],
            localization: (event.target.language.value === localization.changeLanguageOptions['en']) ? 'en' : 'ua'
        }

        fetch(`https://localhost:5001/profiles/${this.user.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }).then(responce => {
            return responce.json()
          }).then(data => {
            if (data.error !== null) {
              throw new Error(data.error);
            }
            else {
                if(this.user.login !== data.login){
                    this.user.login = data.login;
                }
                if(this.user.language !== data.localization){
                    this.user.language = data.localization;
                }
            }
          }).catch(err => alert("Error: " + err.message));
    }

    getFormData(userId) {
        fetch(`https://localhost:5001/profiles/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(responce => {
            return responce.json()
        }).then(data => {
            if (data.message != null) {
                throw new Error(data.message);
            }
            else {
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
                <input type="hidden" name={'id'} value={this.state.formData.id}/>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.registerPage.firstName[this.props.language]}</LabelField>
                        <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
                    </LabelDivForm>
                    <InputForm name={'firstName'} required defaultValue={this.state.formData.name} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.registerPage.lastName[this.props.language]}</LabelField>
                        <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
                    </LabelDivForm>
                    <InputForm name={'lastName'} required defaultValue={this.state.formData.surname} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.registerPage.patronymic[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <InputForm name={'patronymic'} defaultValue={this.state.formData.patronymic} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.registerPage.phone[this.props.language]}</LabelField>
                        <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
                    </LabelDivForm>
                    <InputForm name={'phone'} required defaultValue={this.state.formData.phone} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.registerPage.email[this.props.language]}</LabelField>
                        <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
                    </LabelDivForm>
                    <InputForm name={'email'} type='email' required defaultValue={this.state.formData.login} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.registerPage.gender[this.props.language]}</LabelField>
                        <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
                    </LabelDivForm>
                    <SignUpList name={'gender'} required defaultValue={
                        (this.state.formData.gender === 'M') ?
                            localization.registerPage.genderMan[this.props.language] :
                            localization.registerPage.genderWoman[this.props.language]
                    }>
                        <option>{localization.registerPage.genderMan[this.props.language]}</option>
                        <option> {localization.registerPage.genderWoman[this.props.language]}</option>
                    </SignUpList >
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.registerPage.timezone[this.props.language]}</LabelField>
                        <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
                    </LabelDivForm>
                    <SignUpTimeZone selectedTimeZone={this.state.formData.timeZoneInfoId} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.registerPage.language[this.props.language]}</LabelField>
                        <SignUpLabelRequiredStar>*</SignUpLabelRequiredStar>
                    </LabelDivForm>
                    <SignUpList name={'language'} required defaultValue={localization.changeLanguageOptions[this.state.formData.localization]}>
                        <option> {localization.changeLanguageOptions['en']} </option>
                        <option> {localization.changeLanguageOptions['ua']} </option>
                    </SignUpList>
                </FormFieldDiv>

                <FormFooter> {localization.registerPage.note[this.props.language]} </FormFooter>
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

export default connect(storeToProps, dispatcherToProps)(ProfileSettingsFormElement);
