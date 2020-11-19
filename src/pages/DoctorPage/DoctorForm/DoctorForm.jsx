import React from "react";
import { InputForm, LabelDivForm, FormFieldDiv, LabelField } from "./StyledComponent";
import { Form } from "../../InhalerPage/InhalerForm/StyledComponent";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';
import DoctorSelectElement from './DoctorSelect';

class DoctorForm extends React.Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setState = this.setState.bind(this);
        
        this.user = JSON.parse(localStorage.getItem('user'));
        this.serverAddress = props.serverAddress;
        this.language = JSON.parse(localStorage.getItem('language'));
        
        this.defaultDoctor = { key: 'notSet', value: localization.doctorPage.notSelectedDoctor[this.language]};
        this.state = { 
            formData: 
            { 
                patientDoctorId: '', 
                fullName: '', 
                hospital: { title: '', city: '', address: '' }, 
                doctors: [] 
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
            // console.log("2: " + JSON.stringify(this.state.formData));
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const selectedIndex = event.target.id.options.selectedIndex;
        let newId = event.target.id.options[selectedIndex].getAttribute('data-key');

        const data = {
            patientDoctorId: newId === this.defaultDoctor.key ? null : newId
        }

        fetch(`${this.serverAddress}/patients/doctor/${this.user.id}`, {
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
        fetch(`https://localhost:5001/patients/doctor/${userId}`, {
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
                data.patientDoctorId = (data.patientDoctorId == null) ? 'notSet'  : data.patientDoctorId;
                data.fullName = (data.fullName == null) ? localization.doctorPage.notSelectedDoctor[this.language] : data.fullName;
                data.hospital = (data.hospital == null) ? {} : data.hospital;
                data.doctors.push(this.defaultDoctor);
                this.setState({ formData: data }, function () {
                    // console.log("3: " + JSON.stringify(this.state.formData));
                });
            }
        }).catch(err => alert("Error: " + err.message));
    }

    async componentDidMount() {
        this.getFormData(this.user.id);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField><b>{localization.doctorPage.fullName[this.language]}:</b></LabelField>
                    </LabelDivForm>
                    <DoctorSelectElement name={'id'} formData={this.state.formData} handleChange={this.handleChange} language={this.language}/>
                </FormFieldDiv>
                <LabelField><b>{localization.doctorPage.workplaceInformation[this.language]}</b></LabelField>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalTitle[this.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm disabled defaultValue={this.state.formData.hospital !== undefined ? this.state.formData.hospital.title : undefined} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalCity[this.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm disabled defaultValue={this.state.formData.hospital !== undefined ? this.state.formData.hospital.city : undefined} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalAddress[this.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm disabled defaultValue={this.state.formData.hospital !== undefined ? this.state.formData.hospital.address : undefined} />
                </FormFieldDiv>

                <input type="submit" className="button" value={localization.saveButton[this.language]} />

            </Form>
        )
    }
}

const storeToProps = (store) => ({
    serverAddress: store.serverAddress
});


export default connect(storeToProps, null)(DoctorForm);
