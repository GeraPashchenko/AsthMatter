import React from "react";
import localization from '../../../localization/localization.json';
import { Title, FlexCenter } from '../../MedCardRecordsPage/MedCardRecord/StyledComponent';
import { Table, TableHeader, TD} from '../PatientsPage/StyledComponent';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class HospitalsTable extends React.Component {
    constructor(props) {
        super();
        this.state = { hospitals : [], fetchDone : false };
        this.serverAddress = props.serverAddress;
        this.setState = this.setState.bind(this);
    }

    getHospitals() {
        fetch(`${this.serverAddress}/hospitals`, {
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
                    hospitals : data,
                    fetchDone : true
                });
            } else {
                this.setState({ fetchDone: true });
            }
        }).catch(err => alert("Error: " + err.message));
    }

    async componentDidMount() {
        this.getHospitals();
    }

    deleteHospital(language, hospital){
        let str = `${localization.hospitalsPage.confirm[language]} 
            ${localization.hospitalsPage.hospitalData[language]}:
            ${localization.hospitalData.title[language]} : ${hospital.title}
            ${localization.hospitalData.city[language]}: ${hospital.city}
            ${localization.hospitalData.address[language]}: ${hospital.address}`;
        
        let deleteFlag = window.confirm(str);
        if (deleteFlag) {
            fetch(`${this.serverAddress}/hospitals/delete/${hospital.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(hospital)
            }).then(responce => {
                return responce.json()
            }).then(data => {
                if (data.error != null) {
                    throw new Error(data.error);
                } else {
                    let temp = this.state.hospitals;
                    temp.splice(this.state.hospitals.findIndex(hos => hos.id === hospital.id), 1);
                    this.setState({ hospitals  : temp});
                }
            }).catch(err => alert("Error: " + err.message));
        }
    }

    render() {
        return (
            <>
                { this.state.hospitals.length > 0 ?
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>{localization.hospitalData.title[this.props.language]}</TableHeader>
                                <TableHeader>{localization.hospitalData.city[this.props.language]}</TableHeader>
                                <TableHeader>{localization.hospitalData.address[this.props.language]}</TableHeader>
                                <TableHeader></TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.hospitals.map(hospital => {
                                    return (
                                        <tr key={hospital.id}>
                                            <TD> {hospital.title} </TD>
                                            <TD> {hospital.city} </TD>
                                            <TD> {hospital.address} </TD>
                                            <TD>
                                                <Link to={`/hospital/${hospital.id}`} className="greenButton">{localization.openButton[this.props.language]}</Link>
                                                <input type="button" className="deleteButton" value={localization.deleteButton[this.props.language]} onClick={() => { this.deleteHospital(this.props.language, hospital) }} />
                                            </TD>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table> :
                    this.state.fetchDone ?
                        <FlexCenter>
                            <Title>{localization.hospitalsPage.notFound[this.props.language]}</Title>
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

export default connect(storeToProps, null)(HospitalsTable);