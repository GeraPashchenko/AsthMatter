import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../../localization/localizationFunctions';
import { setLocalization } from "../../../redux/actions";
import localization from "../../../localization/localization.json";
import '../../../shared/styles/pageStyles.css';
import DoctorSideMenu from "../../../menus/DoctorSideMenu";
import {DivWithShift} from '../../InhalerPage/InhalerForm/StyledComponent';
import CreateMedRecordForm from './CreateMedRecordForm';

function CreateMedRecordPage(props) {
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);
    let id = props.match.params.id;

    return (
        <>
            <DoctorSideMenu language={newLang} />

            <DivWithShift>
                    <PageTitle>{localization.createMedCardRecord[newLang]}</PageTitle>
                    <CreateMedRecordForm patientUserId={id} language={newLang}/>
            </DivWithShift>

            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization)}>
                {changeLang(newLang)}
            </LocalizationButton>
        </>
    )
}

const storeToProps = (store) => ({
    language: store.language
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang))
});

export default connect(storeToProps, dispatchToProps)(CreateMedRecordPage);