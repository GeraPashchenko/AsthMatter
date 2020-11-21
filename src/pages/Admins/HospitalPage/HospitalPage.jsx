import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../../shared/styles/HeaderStyles'
import { changeLang, changeLocalization } from '../../../localization/localizationFunctions';
import localization from "../../../localization/localization.json";
import { DivWithShift, Title, FlexCenter } from '../../MedCardRecordsPage/MedCardRecord/StyledComponent';
import AdminSideMenu from "../../../menus/AdminSideMenu";
import '../../../shared/styles/pageStyles.css';
import { setLocalization } from "../../../redux/actions";
import { connect } from "react-redux";
import HospitalForm from "../CreateHospitalPage/HospitalForm";
import { Table, TableHeader, TD } from '../PatientsPage/StyledComponent';

function HospitalPage(props) {
    const { setLocalization } = props;
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);

    let id = props.match.params.id;
    let serverAddress = props.serverAddress;

    var [hospitalInfo, setHospitalInfo] = useState(undefined);
    var [fetchDone, setFetchDone] = useState(false);
    if (!fetchDone) getHospitalInfo(id, setHospitalInfo, setFetchDone, serverAddress);

    return (
        <>
            <AdminSideMenu language={newLang} />

            <DivWithShift>
                <PageTitle>{localization.hospitalPage.title[newLang]}</PageTitle>
                {fetchDone ? <HospitalForm hospital={hospitalInfo} language={newLang} buttonValue={localization.saveButton[newLang]} 
                    editPage={true}/> : ''}
                {fetchDone && hospitalInfo.doctors.length === 0 ?
                    <FlexCenter>
                        <Title>{localization.hospitalPage.doctorsNotFound[newLang]}</Title>
                    </FlexCenter>
                    :
                    fetchDone ? 
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>{localization.doctorData.email[newLang]}</TableHeader>
                                <TableHeader>{localization.doctorData.surname[newLang]}</TableHeader>
                                <TableHeader>{localization.doctorData.name[newLang]}</TableHeader>
                                <TableHeader>{localization.doctorData.patronymic[newLang]}</TableHeader>
                                <TableHeader>{localization.doctorData.gender[newLang]}</TableHeader>
                                <TableHeader>{localization.doctorData.phone[newLang]}</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                hospitalInfo.doctors.map(doctor => {
                                    return (
                                        <tr key={doctor.user.id}>
                                            <TD> {doctor.user.login} </TD>
                                            <TD> {doctor.user.surname} </TD>
                                            <TD> {doctor.user.name} </TD>
                                            <TD> {doctor.user.patronymic != null ? doctor.user.patronymic : '-'} </TD>
                                            <TD>{doctor.user.gender === 'F' ?
                                                localization.registerPage.genderWoman[newLang]
                                                :
                                                localization.registerPage.genderMan[newLang]}
                                            </TD>
                                            <TD>{doctor.user.phone}</TD>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    :
                    ''
                }
            </DivWithShift>
            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization)}>
                {changeLang(newLang)}
            </LocalizationButton>
        </>
    )
}

function getHospitalInfo(id, setHospitalInfo, setFetchDone, serverAddress) {
    fetch(`${serverAddress}/hospitals/${id}`, {
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
            setHospitalInfo(data);
            setFetchDone(true);
        }
    }).catch(err => alert("Error: " + err.message));
}

const storeToProps = (store) => ({
    serverAddress: store.serverAddress
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang))
});

export default connect(storeToProps, dispatchToProps)(HospitalPage);