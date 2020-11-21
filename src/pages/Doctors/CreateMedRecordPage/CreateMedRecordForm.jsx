import React from "react";
import {
    Form,
    LabelDivForm,
    InputForm,
    TextArea,
    FormFieldDiv,
    LabelField,
} from "../../MedCardInformationPage/MedCardInformationForm/StyledComponent";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';
import { DivFlexColumn } from '../../InhalerPage/InhalerForm/StyledComponent';
import {MedicineInput, MedicineLabelField} from './StyledComponent';
import { Redirect } from "react-router";

class CreateMedRecordForm extends React.Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.serverAddress = props.serverAddress;
        this.state = { patientUserId: props.patientUserId, medCount : 0, redirect : false };
        this.setState = this.setState.bind(this);
        this.deleteMed = this.deleteMed.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let prescrMed = [];
        if(document.getElementsByName('title[]') !== undefined){
            for(let i = 0; i < document.getElementsByName('title[]').length; i++){
                prescrMed.push({ 
                    title : document.getElementsByName('title[]')[i].value, 
                    medType : document.getElementsByName('medType[]')[i].value,
                    dosage : document.getElementsByName('dosage[]')[i].value === '' ? null : document.getElementsByName('dosage[]')[i].value,
                    howToUse : document.getElementsByName('howToUse[]')[i].value === '' ? null : document.getElementsByName('howToUse[]')[i].value,
                    isActual : true
                });
            }
        }

        const data = {
            createdAt : event.target.createdAt.value,
            information : event.target.information.value,
            prescriptedMedicines : prescrMed
        };

        fetch(`${this.serverAddress}/medrecords/create/${this.state.patientUserId}`, {
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
          }else{
              this.setState({redirect : true});
          }
        }).catch(err => alert("Error: " + err.message));
    }

    deleteMed(i){
        alert(i);
        let med = document.getElementById(i);
        med.parentNode.removeChild(med);
    }

    render() {
        const children = [];
        for (let i = 0; i < this.state.medCount; i++) {
            children.push(
                <FormFieldDiv id={i}>
                    <DivFlexColumn>
                        <MedicineLabelField>{localization.medicinesTable.title[this.props.language]}</MedicineLabelField>
                        <MedicineInput type='text' name={'title[]'} required />
                    </DivFlexColumn>
                    <DivFlexColumn>
                        <MedicineLabelField>{localization.medicinesTable.type[this.props.language]}</MedicineLabelField>
                        <MedicineInput type='text' name={'medType[]'} required />
                    </DivFlexColumn>
                    <DivFlexColumn>
                        <MedicineLabelField>{localization.medicinesTable.dosage[this.props.language]}</MedicineLabelField>
                        <MedicineInput type='text' name={'dosage[]'} />
                    </DivFlexColumn>
                    <DivFlexColumn>
                        <MedicineLabelField>{localization.medicinesTable.howToUse[this.props.language]}</MedicineLabelField>
                        <MedicineInput type='text' name={'howToUse[]'} />
                    </DivFlexColumn>
                    <InputForm type='hidden' name={'isActual[]'} value={true} />
                    <input type="button" className="button deleteProfileButton" value={localization.deleteButton[this.props.language]} 
                                onClick={() => { this.deleteMed(i) }}/>            
                </FormFieldDiv>
            );
        };

        return (
            <Form id={'form'} onSubmit={this.handleSubmit}>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.medRecordData.createdAt[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <InputForm type='datetime-local' name={'createdAt'} required/>
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.medRecordData.information[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <TextArea name={'information'} required/>
                </FormFieldDiv>
                {this.state.medCount > 0 ? 
                                <FormFieldDiv>
                                <LabelDivForm>
                                    <LabelField>{localization.medRecordData.prescriptedMedicines[this.props.language]}</LabelField>
                                </LabelDivForm>
                            </FormFieldDiv>
                            :
                            ''
                }
                {children}

                <input type="button" className="button changePasswordButton" value={localization.addMedicines[this.props.language]} 
                    onClick={() => this.setState({medCount : this.state.medCount + 1})}/>

                <input type="submit" className="button" value={localization.saveButton[this.props.language]} />
                {this.state.redirect ? <Redirect to={`/medCardRecords/${this.state.patientUserId}`} /> : ''}
            </Form>
        )
    }
}

const storeToProps = (store) => ({
    serverAddress: store.serverAddress
});


export default connect(storeToProps, null)(CreateMedRecordForm);
