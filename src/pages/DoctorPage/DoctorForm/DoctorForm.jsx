import React from "react";
import { InputForm, LabelDivForm, FormFieldDiv, LabelField } from "./StyledComponent";
import { Form } from "../../InhalerPage/InhalerForm/StyledComponent";
import { setUser } from "../../../redux/actions";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';
import DoctorSelectElement from './DoctorSelect';

class DoctorForm extends React.Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.user = props.user;
        this.setUser = props.setUser;
        this.state = { formData: { id : '', fullName : '', hospital : { title : '', city : '', address : ''}, doctors: [] }};
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

        // fetch(`https://localhost:5001/profiles/${this.user.id}`, {
        //     method: 'PUT',
        //     credentials: 'include',
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        //   }).then(responce => {
        //     return responce.json()
        //   }).then(data => {
        //     if (data.error !== null) {
        //       throw new Error(data.error);
        //     }
        //     else {
        //         if(this.user.login !== data.login){
        //             this.user.login = data.login;
        //         }
        //     }
        //   }).catch(err => alert("Error: " + err.message));
    }

    getFormData(userId) {
        fetch(`https://localhost:5001/patients/doctor/${userId}`, {
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
                console.log(JSON.stringify(data));
                this.setState({ formData: data });
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
                        <LabelField><b>{localization.doctorPage.fullName[this.props.language]}:</b></LabelField>
                    </LabelDivForm>
                    <DoctorSelectElement formData={this.state.formData} name={'id'}/>
                    {/* <InputForm name={'id'} defaultValue={this.state.formData.fullName} /> */}
                </FormFieldDiv>
                <LabelField><b>{localization.doctorPage.workplaceInformation[this.props.language]}</b></LabelField>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalTitle[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm disabled value={this.state.formData.hospital !== undefined ? this.state.formData.hospital.title : undefined} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalCity[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm disabled value={this.state.formData.hospital !== undefined ? this.state.formData.hospital.city : undefined} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalAddress[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm disabled value={this.state.formData.hospital !== undefined ? this.state.formData.hospital.address : undefined} />
                </FormFieldDiv>

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

export default connect(storeToProps, dispatcherToProps)(DoctorForm);
