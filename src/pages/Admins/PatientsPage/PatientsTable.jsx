import React from "react";
import localization from '../../../localization/localization.json';
import { Title, FlexCenter } from '../../MedCardRecordsPage/MedCardRecord/StyledComponent';
import { Table, TableHeader, TD} from './StyledComponent';

class PatientsTable extends React.Component {
    constructor(props) {
        super();
        this.state = { patients: [], fetchDone: false }
    }

    getPatients() {
        fetch(`https://localhost:5001/patients`, {
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
            if (data.length > 0) {
                this.setState({
                    patients: data,
                    fetchDone: true
                }, console.log(JSON.stringify(data)));
            } else {
                this.setState({ fetchDone: true });
            }
        }).catch(err => alert("Error: " + err.message));
    }

    async componentDidMount() {
        this.getPatients();
    }

    deletePatient(language, patient){
        let str = `${localization.deletePatientAdminPage.confirm[language]} 
            ${localization.deletePatientAdminPage.patientData[language]}:
            ${localization.patientData.email[language]} : ${patient.login}
            ${localization.patientData.surname[language]}: ${patient.surname}
            ${localization.patientData.name[language]}: ${patient.name}
            ${localization.patientData.patronymic[language]}: ${patient.patronymic !== null ? patient.patronymic : '-'}
            ${localization.patientData.gender[language]}: ${patient.gender === 'F' ? localization.registerPage.genderWoman[language] : localization.registerPage.genderMan[language]}
            ${localization.patientData.phone[language]}: ${patient.phone !== null ? patient.phone : '-'}
            ${localization.patientData.inhalerID[language]}: ${patient.inhalerId !== null ? patient.inhalerId : '-'}`;
    
        let deleteFlag = window.confirm(str);
        if (deleteFlag) {
            fetch(`https://localhost:5001/patients/delete/${patient.userId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(patient)
            }).then(responce => {
                return responce.json()
            }).then(data => {
                if (data.error != null) {
                    throw new Error(data.error);
                } else {
                    let temp = this.state.patients;
                    this.setState({ patients : temp.splice(this.state.patients.findIndex(pat => pat.id === patient.id), 1)});
                }
            }).catch(err => alert("Error: " + err.message));
        }
    }

    render() {
        return (
            <>
                { this.state.patients.length > 0 ?
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>{localization.patientData.email[this.props.language]}</TableHeader>
                                <TableHeader>{localization.patientData.surname[this.props.language]}</TableHeader>
                                <TableHeader>{localization.patientData.name[this.props.language]}</TableHeader>
                                <TableHeader>{localization.patientData.patronymic[this.props.language]}</TableHeader>
                                <TableHeader>{localization.patientData.gender[this.props.language]}</TableHeader>
                                <TableHeader>{localization.patientData.phone[this.props.language]}</TableHeader>
                                <TableHeader>{localization.patientData.inhalerID[this.props.language]}</TableHeader>
                                <TableHeader></TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.patients.map(patient => {
                                    return (
                                        <tr key={patient.id}>
                                            <TD> {patient.login} </TD>
                                            <TD> {patient.surname} </TD>
                                            <TD> {patient.name} </TD>
                                            <TD> {patient.patronymic != null ? patient.patronymic : '-'} </TD>
                                            <TD> {patient.gender === 'F' ? localization.registerPage.genderWoman[this.props.language] : localization.registerPage.genderMan[this.props.language]}</TD>
                                            <TD> {patient.phone !== null ? patient.phone : '-'} </TD>
                                            <TD> {patient.inhalerId !== null ? patient.inhalerId : '-'}</TD>
                                            <TD>
                                                <input type="button" className="deleteButton" value={localization.deleteButton[this.props.language]} onClick={() => { this.deletePatient(this.props.language, patient) }} />
                                            </TD>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table> :
                    this.state.fetchDone ?
                        <FlexCenter>
                            <Title>{localization.patientsAdminPage.notFound[this.props.language]}</Title>
                        </FlexCenter>
                        :
                        undefined
                }
            </>
        )
    }
}

export default PatientsTable;