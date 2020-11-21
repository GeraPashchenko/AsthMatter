import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../../shared/styles/HeaderStyles'
import { changeLang, changeLocalization } from '../../../localization/localizationFunctions';
import localization from "../../../localization/localization.json";
import { DivWithShift } from "../../InhalerPage/InhalerForm/StyledComponent";
import AdminSideMenu from "../../../menus/AdminSideMenu";
import '../../../shared/styles/pageStyles.css';
import { setLocalization } from "../../../redux/actions";
import { connect } from "react-redux";
import HospitalForm from './HospitalForm';

function CreateHospitalPage(props) {
    const { setLocalization } = props;
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);

    return (
        <>
            <AdminSideMenu language={newLang} />

            <DivWithShift>
                <PageTitle>{localization.createNewHospitalPage.title[newLang]}</PageTitle>
                <HospitalForm language={newLang}/>          
            </DivWithShift>
            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization)}>
                {changeLang(newLang)}
            </LocalizationButton>
        </>
    )
}

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang))
});

export default connect(null, dispatchToProps)(CreateHospitalPage);