import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../../shared/styles/HeaderStyles'
import { changeLang, changeLocalization } from '../../../localization/localizationFunctions';
import localization from "../../../localization/localization.json";
import { DivWithShift } from '../../MedCardRecordsPage/MedCardRecord/StyledComponent';
import AdminSideMenu from "../../../menus/AdminSideMenu";
import '../../../shared/styles/pageStyles.css';
import AdminsTable from './AdminsTable';
import { setLocalization } from "../../../redux/actions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { FlexRow } from '../MainBoardPage/StyledComponent';

function AdminsPage(props) {
    const { setLocalization } = props;
    let language = localStorage.getItem('language');
    let [newLang, setLang] = useState(language);

    return (
        <>
            <AdminSideMenu language={newLang} />

            <DivWithShift>
                <FlexRow>
                    <PageTitle>{localization.adminsPage.title[newLang]}</PageTitle>
                    <Link to="/createAdmin" className="button">
                        {localization.createButton[newLang]}
                    </Link>       
                </FlexRow>
                <AdminsTable language={newLang} />
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

export default connect(null, dispatchToProps)(AdminsPage);