import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import localization from "../../localization/localization.json";
import { Title } from '../MedCardRecordsPage/MedCardRecord/StyledComponent';
import { DivWithShift } from "../InhalerPage/InhalerForm/StyledComponent";
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import '../../shared/styles/pageStyles.css';
import PrescriptedMedicinesTable from "../MedCardRecordsPage/MedCardRecord/PrescriptedMedicinesTable";
import DoctorSideMenu from "../../menus/DoctorSideMenu";

function MedicinesPage(props) {
    const { setLocalization } = props;
    var [medicine, setMedicines] = useState(undefined);
    var [fetchDone, setFetchDone] = useState(false);
    let id = props.match.params.id !== undefined ? props.match.params.id : null;
    let user = { id: id };
    if(user.id === null){
        user = JSON.parse(localStorage.getItem('user'));
    }
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);
    let serverAddress = props.serverAddress;

    if(!fetchDone) getMedicines(user.id, setMedicines, setFetchDone, serverAddress);

    return (
        <>
      { JSON.parse(localStorage.getItem('user')).role === 'Patient' ? <PatientSideMenuElement language={newLang} /> : ''}
      { JSON.parse(localStorage.getItem('user')).role === 'Doctor' ? <DoctorSideMenu language={newLang} /> : ''}
            <DivWithShift>
                <PageTitle>{localization.medicinesPage.title[newLang]}</PageTitle>
            { (medicine !== undefined && medicine.length > 0) ? 
            <PrescriptedMedicinesTable medicines={medicine} language={newLang} setActualColumn={false} setDeleteColumn={JSON.parse(localStorage.getItem('user')).role === 'Doctor'}/> 
            : fetchDone === true ? 
                <Title>{localization.medicinesPage.noActualMedicines[newLang]}</Title>
                :
                undefined
            }
            </DivWithShift>
            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization, serverAddress)}>
                {changeLang(newLang)}
            </LocalizationButton>
        </>
    )
}

function getMedicines(id, setMedicines, setFetchDone, serverAddress){
    fetch(`${serverAddress}/medicines/${id}`, {
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
            setMedicines(data);
            setFetchDone(true);
        }
    }).catch(err => alert("Error: " + err.message));
}

const storeToProps = (store) => ({
    serverAddress : store.serverAddress
});

export default connect(storeToProps)(MedicinesPage);