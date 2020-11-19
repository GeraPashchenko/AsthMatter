import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../localization/localizationFunctions';
import { setLocalization } from "../../redux/actions";
import PatientSideMenuElement from "../../menus/PatientSideMenu";
import '../../shared/styles/pageStyles.css';
import MedRecord from '../MedCardRecordsPage/MedCardRecord/MedRecord';
import { Title, DivWithShift } from '../MedCardRecordsPage/MedCardRecord/StyledComponent';
import localization from '../../localization/localization.json';

function MedRecordPage(props) {
    const { setLocalization } = props;
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);
    let id = props.match.params.id;
    let serverAddress = props.serverAddress;
    var [rec, setRecord] = useState(undefined);
    var [fetchDone, setFetchDone] = useState(false);
    if(!fetchDone) getRecord(id, setRecord, setFetchDone, serverAddress);

    return (
        <>
            <PatientSideMenuElement language={newLang} />

            <DivWithShift>
                <PageTitle>{localization.MedCard.medCardRecordsPage.medCardRecord[newLang]}</PageTitle>
            { rec !== undefined ? 
            <MedRecord record={rec} language={newLang} setButton={false} /> 
            : fetchDone === true ? 
                <Title>{localization.MedCard.medCardRecordsPage.recordNotFound[newLang]}</Title>
                :
                undefined
            }
            </DivWithShift>

            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization)}>
                {changeLang(newLang)}
            </LocalizationButton>
        </>
    )
}

function getRecord(id, setRecord, setFetchDone, serverAddress){
    fetch(`${serverAddress}/medrecords/record/${id}`, {
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
            setRecord(data);
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

export default connect(storeToProps, dispatchToProps)(MedRecordPage);