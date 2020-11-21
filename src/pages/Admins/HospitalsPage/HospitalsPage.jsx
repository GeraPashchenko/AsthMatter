import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../../shared/styles/HeaderStyles'
import { changeLang, changeLocalization } from '../../../localization/localizationFunctions';
import localization from "../../../localization/localization.json";
import { DivWithShift } from '../../MedCardRecordsPage/MedCardRecord/StyledComponent';
import AdminSideMenu from "../../../menus/AdminSideMenu";
import '../../../shared/styles/pageStyles.css';
import HospitalsTable from './HospitalsTable';
import { setLocalization } from "../../../redux/actions";
import { connect } from "react-redux";
import { FlexRow } from '../MainBoardPage/StyledComponent';
import { Link } from 'react-router-dom';

function HospitalsPage(props) {
    const { setLocalization } = props;
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);

    return (
        <>
            <AdminSideMenu language={newLang} />

            <DivWithShift>
                <FlexRow>
                    <PageTitle>{localization.hospitalsPage.title[newLang]}</PageTitle>
                    <Link to="/createHospital" className="button">
                        {localization.createButton[newLang]}
                    </Link>       
                </FlexRow>
                <HospitalsTable language={newLang} />
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

export default connect(storeToProps, dispatchToProps)(HospitalsPage);