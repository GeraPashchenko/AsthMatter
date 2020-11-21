import React from "react";
import { InputForm, LabelDivForm, FormFieldDiv, LabelField } from "../../DoctorPage/DoctorForm/StyledComponent";
import { Form } from "../../InhalerPage/InhalerForm/StyledComponent";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';

class WorkplaceForm extends React.Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setState = this.setState.bind(this);
        
        this.user = JSON.parse(localStorage.getItem('user'));
        this.serverAddress = props.serverAddress;
        this.state = { 
            formData: 
            { 
                id : this.user.id,
                hospital : {}
            }
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        let data = {
            id : event.target.id.value,
            hospital : null
        };
        var activeElement = document.activeElement;
        if(activeElement.value === localization.saveButton[this.props.language]){
            data = {
                id : event.target.id.value,
                hospital : {
                    title : event.target.title.value,
                    city : event.target.city.value,
                    address : event.target.address.value
                }
            };
            if(data.title === '' || data.city === '' || data.address === ''){
                alert(localization.requiredFields[this.props.language]);
                return;
            }
        }

        fetch(`${this.serverAddress}/doctors/edit/${this.user.id}`, {
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
            }else{
                data.hospital = data.hospital === null ? {} : data.hospital;
                this.setState({formData : data});
            }
          }).catch(err => alert("Error: " + err.message));
    }

    getFormData(userId) {
        fetch(`${this.serverAddress}/doctors/edit/${userId}`, {
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
                data.hospital = (data.hospital == null) ? {} : data.hospital;
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
                <input type='hidden' name={'id'} value={this.user.id} />
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalTitle[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm name={'title'} defaultValue={this.state.formData.hospital !== undefined ? this.state.formData.hospital.title : undefined} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalCity[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm name={'city'} defaultValue={this.state.formData.hospital !== undefined ? this.state.formData.hospital.city : undefined} />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.doctorPage.hospitalAddress[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm name={'address'} defaultValue={this.state.formData.hospital !== undefined ? this.state.formData.hospital.address : undefined} />
                </FormFieldDiv>

                <FormFieldDiv>
                <input type="submit" name={'submitButton'} className="button" value={localization.saveButton[this.props.language]} />
                <input type="submit" name={'submitButton'} className="button redButton" value={localization.noHospital[this.props.language]} />
                </FormFieldDiv>

            </Form>
        )
    }
}

const storeToProps = (store) => ({
    serverAddress: store.serverAddress
});


export default connect(storeToProps, null)(WorkplaceForm);
