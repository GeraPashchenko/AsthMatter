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
        this.handleChange = this.handleChange.bind(this);
        this.setState = this.setState.bind(this);

        this.user = props.user;
        this.setUser = props.setUser;
        this.defaultDoctor = { key: 'notSet', value: localization.doctorPage.notSelectedDoctor[props.language]};
        this.state = { 
            formData: 
            { 
                patientDoctorId: '', 
                fullName: '', 
                hospital: { title: '', city: '', address: '' }, 
                doctors: [ this.defaultDoctor ] 
            } 
        };
    }

    handleChange(event) {
        const selectedIndex = event.target.options.selectedIndex;
        let newId = event.target.options[selectedIndex].getAttribute('data-key');
        let newFullName = event.target.options[selectedIndex].value;
        let newHospital = {};
        this.state.formData.doctors.map(doctor => {
            if (doctor.user !== undefined && doctor.user.id == newId) {
                newHospital = doctor.hospital == null ? {} : doctor.hospital;
            }
        });
        let newFormData = {
            patientDoctorId: newId,
            fullName: newFullName,
            hospital: newHospital,
            doctors: this.state.formData.doctors
        };
        this.setState({ formData: newFormData }, function () {
            console.log("2: " + JSON.stringify(this.state.formData));
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const selectedIndex = event.target.options.selectedIndex;
        let newId = event.target.options[selectedIndex].getAttribute('data-key');

        const data = {
            id: newId
        }

        fetch(`https://localhost:5001/patients/doctor/${this.user.id}`, {
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
          }).catch(err => alert("Error: " + err.message));
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
                data.doctors.push(this.defaultDoctor);
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
                <input type="hidden" name={'id'} value={this.state.formData.id} />
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField><b>{localization.doctorPage.fullName[this.props.language]}:</b></LabelField>
                    </LabelDivForm>
                    <DoctorSelectElement name={'id'} formData={this.state.formData} handleChange={this.handleChange}/>
                </FormFieldDiv>
                <LabelField><b>{localization.doctorPage.workplaceInformation[this.props.language]}</b></LabelField>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalTitle[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm disabled defaultValue={this.state.formData.hospital !== undefined ? this.state.formData.hospital.title : undefined} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalCity[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm disabled defaultValue={this.state.formData.hospital !== undefined ? this.state.formData.hospital.city : undefined} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalAddress[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm disabled defaultValue={this.state.formData.hospital !== undefined ? this.state.formData.hospital.address : undefined} />
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
