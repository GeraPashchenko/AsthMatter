import React from "react";
import localization from '../../../localization/localization.json';
import { Title, FlexCenter } from '../../MedCardRecordsPage/MedCardRecord/StyledComponent';
import { Table, TableHeader, TD} from '../PatientsPage/StyledComponent';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class DoctorsTable extends React.Component {
    constructor(props) {
        super();
        this.state = { doctors : [], fetchDone : false };
        this.serverAddress = props.serverAddress;
    }

    getDoctors() {
        fetch(`${this.serverAddress}/doctors`, {
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
                    doctors : data,
                    fetchDone : true
                });
            } else {
                this.setState({ fetchDone: true });
            }
        }).catch(err => alert("Error: " + err.message));
    }

    async componentDidMount() {
        this.getDoctors();
    }

    deleteDoctor(language, doctor){
        let str = `${localization.doctorsAdminPage.confirm[language]} 
            ${localization.doctorsAdminPage.doctorData[language]}:
            ${localization.doctorData.email[language]} : ${doctor.user.login}
            ${localization.doctorData.surname[language]}: ${doctor.user.surname}
            ${localization.doctorData.name[language]}: ${doctor.user.name}
            ${localization.doctorData.patronymic[language]}: ${doctor.user.patronymic !== null ? doctor.user.patronymic : '-'}
            ${localization.doctorData.hospital[language]}: ${doctor.hospital !== null ? doctor.hospital.title : '-'}`;
        
        let deleteFlag = window.confirm(str);
        if (deleteFlag) {
            fetch(`${this.serverAddress}/doctors/delete/${doctor.user.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(doctor)
            }).then(responce => {
                return responce.json()
            }).then(data => {
                if (data.error != null) {
                    throw new Error(data.error);
                } else {
                    let temp = this.state.doctors;
                    temp.splice(this.state.doctors.findIndex(doc => doc.user.id === doctor.user.id), 1);
                    this.setState({ doctors : temp});
                }
            }).catch(err => alert("Error: " + err.message));
        }
    }

    render() {
        return (
            <>
                { this.state.doctors.length > 0 ?
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>{localization.doctorData.email[this.props.language]}</TableHeader>
                                <TableHeader>{localization.doctorData.surname[this.props.language]}</TableHeader>
                                <TableHeader>{localization.doctorData.name[this.props.language]}</TableHeader>
                                <TableHeader>{localization.doctorData.patronymic[this.props.language]}</TableHeader>
                                <TableHeader>{localization.doctorData.hospital[this.props.language]}</TableHeader>
                                <TableHeader></TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.doctors.map(doctor => {
                                    return (
                                        <tr key={doctor.user.id}>
                                            <TD> {doctor.user.login} </TD>
                                            <TD> {doctor.user.surname} </TD>
                                            <TD> {doctor.user.name} </TD>
                                            <TD> {doctor.user.patronymic != null ? doctor.user.patronymic : '-'} </TD>
                                            <TD> {doctor.hospital !== null ? doctor.hospital.title : '-'}</TD>
                                            <TD>
                                                <Link to={`/doctor/${doctor.user.id}`} className="greenButton">{localization.openButton[this.props.language]}</Link>
                                                <input type="button" className="deleteButton" value={localization.deleteButton[this.props.language]} onClick={() => { this.deleteDoctor(this.props.language, doctor) }} />
                                            </TD>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table> :
                    this.state.fetchDone ?
                        <FlexCenter>
                            <Title>{localization.doctorsAdminPage.notFound[this.props.language]}</Title>
                        </FlexCenter>
                        :
                        undefined
                }
            </>
        )
    }
}

const storeToProps = (store) => ({
    serverAddress : store.serverAddress
});

export default connect(storeToProps, null)(DoctorsTable);