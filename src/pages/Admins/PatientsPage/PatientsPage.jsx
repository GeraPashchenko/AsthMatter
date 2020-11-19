import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../../shared/styles/HeaderStyles'
import { changeLang, changeLocalization } from '../../../localization/localizationFunctions';
import localization from "../../../localization/localization.json";
import { DivWithShift } from '../../MedCardRecordsPage/MedCardRecord/StyledComponent';
import AdminSideMenu from "../../../menus/AdminSideMenu";
import '../../../shared/styles/pageStyles.css';
import PatientsTable from './PatientsTable';
import { setLocalization } from "../../../redux/actions";
import { connect } from "react-redux";

function PatientsPage(props) {
    const { language, setLocalization } = props;
    let [newLang, setLang] = useState(language);

    return (
        <>
            <AdminSideMenu language={newLang} />

            <DivWithShift>
                <PageTitle>{localization.patientsAdminPage.title[newLang]}</PageTitle>
                <PatientsTable language={newLang} />
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

export default connect(storeToProps, dispatchToProps)(PatientsPage);