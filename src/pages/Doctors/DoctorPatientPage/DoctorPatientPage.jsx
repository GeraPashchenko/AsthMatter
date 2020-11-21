import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../../localization/localizationFunctions';
import { setLocalization } from "../../../redux/actions";
import localization from "../../../localization/localization.json";
import { DivFlexColumn  } from "../../InhalerPage/InhalerForm/StyledComponent";
import '../../../shared/styles/pageStyles.css';
import DoctorSideMenu from "../../../menus/DoctorSideMenu";
import MedCardInformationForm from "./MedCardInformationForm";
import {Link} from 'react-router-dom';
import {DivWithShift} from './StyledComponent';

function DoctorPatientPage(props) {
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);
    let id = props.match.params.id;
    return (
        <>
            <DoctorSideMenu language={newLang} />

            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization)}>
                {changeLang(newLang)}
            </LocalizationButton>
            <DivWithShift>
                <DivFlexColumn>
                    <PageTitle>{localization.MedCard.medCardInformationPage.title[newLang]}</PageTitle>
                    <MedCardInformationForm id={id} language={newLang}/>
                </DivFlexColumn>
                <DivFlexColumn>
                    <Link to={`/medCardRecords/${id}`} className="sideButton changePasswordButton button">
                        {localization.medcardRecords[newLang]}
                    </Link>
                    <Link to="/attacksDiary" className="sideButton deleteProfileButton button">
                        {localization.attacksDiaryButton[newLang]}
                    </Link>
                    <Link to={`/medicines/${id}`} className="sideButton prescriptedMedicinesButton button">
                        {localization.prescriptedMedicines[newLang]}
                    </Link>
                    <Link to={`/createRecord/${id}`} className="sideButton createRecordButton button">
                        {localization.createRecordButton[newLang]}
                    </Link>
                </DivFlexColumn>
            </DivWithShift>
        </>
    )
}

const storeToProps = (store) => ({
    language: store.language
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang))
});

export default connect(storeToProps, dispatchToProps)(DoctorPatientPage);