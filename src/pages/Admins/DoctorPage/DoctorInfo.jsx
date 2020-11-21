import React from "react";
import localization from '../../../localization/localization.json';
import { DivRow, DivColumn, InfoDiv, LabelField, DivColumnWithMargin } from './StyledComponent';
import { Table, TableHeader, TD} from '../PatientsPage/StyledComponent';

class DoctorInfo extends React.Component {
    constructor(props) {
        super();
        this.doctor = props.doctor;
    }

    render() {
        return (
            <>
                {this.doctor === undefined ?
                    <LabelField>{localization.informationAboutDoctorAdminPage.notFound[this.props.language]}</LabelField>
                    :
                    <DivRow>
                        <DivColumn>
                            <InfoDiv>
                                <LabelField><b>{`${localization.informationAboutDoctorAdminPage.fullName[this.props.language]}: `}</b></LabelField>
                                <LabelField>
                                    {`${this.doctor.user.surname} ${this.doctor.user.name} ${this.doctor.user.patronymic !== null ? this.doctor.user.patronymic : ''}`}
                                </LabelField>
                            </InfoDiv>
                            <InfoDiv>
                                <LabelField>{`${localization.doctorData.email[this.props.language]}: `}</LabelField>
                                <LabelField>{this.doctor.user.login}</LabelField>
                            </InfoDiv>
                            <InfoDiv>
                                <LabelField>{`${localization.doctorData.phone[this.props.language]}: `}</LabelField>
                                <LabelField>{this.doctor.user.phone}</LabelField>
                            </InfoDiv>
                            <InfoDiv>
                                <LabelField>{`${localization.doctorData.gender[this.props.language]}: `}</LabelField>
                                <LabelField>
                                    {this.doctor.user.gender === 'F' ?
                                        localization.registerPage.genderWoman[this.props.language]
                                        :
                                        localization.registerPage.genderMan[this.props.language]}</LabelField>
                            </InfoDiv>
                        </DivColumn>
                        <DivColumn>
                            <InfoDiv>
                                <LabelField><b>{`${localization.doctorData.workplaceInformation[this.props.language]}`}</b></LabelField>
                            </InfoDiv>
                            <InfoDiv>
                                <LabelField>{`${localization.hospitalData.title[this.props.language]}: `}</LabelField>
                                <LabelField>{this.doctor.hospital != null ? this.doctor.hospital.title : '-'}</LabelField>
                            </InfoDiv>
                            <InfoDiv>
                                <LabelField>{`${localization.hospitalData.city[this.props.language]}: `}</LabelField>
                                <LabelField>{this.doctor.hospital != null ? this.doctor.hospital.city : '-'}</LabelField>
                            </InfoDiv>
                            <InfoDiv>
                                <LabelField>{`${localization.hospitalData.address[this.props.language]}: `}</LabelField>
                                <LabelField>{this.doctor.hospital != null ? this.doctor.hospital.address : '-'}</LabelField>
                            </InfoDiv>
                        </DivColumn>
                    </DivRow>
                }
                <DivColumnWithMargin>
<LabelField><b>{`${localization.doctorData.patients[this.props.language]}: `}</b></LabelField>
                { this.doctor.patients.length === 0 ?
                    <LabelField>{localization.informationAboutDoctorAdminPage.noPatients[this.props.language]}</LabelField>
                    :
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.doctor.patients.map(patient => {
                                    return (
                                        <tr key={patient.id}>
                                            <TD> {patient.login} </TD>
                                            <TD> {patient.surname} </TD>
                                            <TD> {patient.name} </TD>
                                            <TD> {patient.patronymic != null ? patient.patronymic : '-'} </TD>
                                            <TD> {patient.gender === 'F' ? localization.registerPage.genderWoman[this.props.language] : localization.registerPage.genderMan[this.props.language]}</TD>
                                            <TD> {patient.phone !== null ? patient.phone : '-'} </TD>
                                            <TD> {patient.inhalerId !== null ? patient.inhalerId : '-'}</TD>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                }
                </DivColumnWithMargin>
            </>
        )
    }
}

export default DoctorInfo;