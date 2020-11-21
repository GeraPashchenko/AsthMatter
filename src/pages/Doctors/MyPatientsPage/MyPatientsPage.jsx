import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../../shared/styles/HeaderStyles'
import { changeLang, changeLocalization } from '../../../localization/localizationFunctions';
import localization from "../../../localization/localization.json";
import { DivWithShift } from '../../MedCardRecordsPage/MedCardRecord/StyledComponent';
import '../../../shared/styles/pageStyles.css';
import MyPatientsTable from './MyPatientsTable';
import { setLocalization } from "../../../redux/actions";
import { connect } from "react-redux";
import DoctorSideMenu from "../../../menus/DoctorSideMenu";

function MyPatientsPage(props) {
    const { setLocalization } = props;
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);

    return (
        <>
            <DoctorSideMenu language={newLang} />

            <DivWithShift>
                <PageTitle>{localization.myPatientsPage.title[newLang]}</PageTitle>
                <MyPatientsTable language={newLang} />
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

export default connect(storeToProps, dispatchToProps)(MyPatientsPage);