import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../../shared/styles/HeaderStyles'
import { changeLang, changeLocalization } from '../../../localization/localizationFunctions';
import localization from "../../../localization/localization.json";
import { DivWithShift } from '../../MedCardRecordsPage/MedCardRecord/StyledComponent';
import AdminSideMenu from "../../../menus/AdminSideMenu";
import '../../../shared/styles/pageStyles.css';
import { setLocalization } from "../../../redux/actions";
import { connect } from "react-redux";
import DoctorInfo from './DoctorInfo';

function DoctorAdminPage(props) {
    const { setLocalization } = props;
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);

    let id = props.match.params.id;
    let serverAddress = props.serverAddress;

    var [doctorInfo, setDoctor] = useState(undefined);
    var [fetchDone, setFetchDone] = useState(false);
    if(!fetchDone) getDoctorInfo(id, setDoctor, setFetchDone, serverAddress);

    return (
        <>
            <AdminSideMenu language={newLang} />

            <DivWithShift>
                <PageTitle>{localization.informationAboutDoctorAdminPage.title[newLang]}</PageTitle>
                {fetchDone === true ? <DoctorInfo doctor={doctorInfo} language={newLang} /> : ''}
            </DivWithShift>
            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization)}>
                {changeLang(newLang)}
            </LocalizationButton>
        </>
    )
}

function getDoctorInfo(id, setDoctor, setFetchDone, serverAddress){
    fetch(`${serverAddress}/doctors/${id}`, {
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
            setDoctor(data);
            setFetchDone(true);
        }
    }).catch(err => alert("Error: " + err.message));
}

const storeToProps = (store) => ({
    serverAddress : store.serverAddress
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang))
});

export default connect(storeToProps, dispatchToProps)(DoctorAdminPage);