import React, { useState } from "react";
import { LocalizationButton, PageTitle } from '../../../shared/styles/HeaderStyles'
import { connect } from "react-redux";
import { changeLang, changeLocalization } from '../../../localization/localizationFunctions';
import { setLocalization } from "../../../redux/actions";
import localization from '../../../localization/localization.json';
import { DivWithShift } from "../../MedCardRecordsPage/MedCardRecord/StyledComponent";
import AdminSideMenu from "../../../menus/AdminSideMenu";
import '../../../shared/styles/pageStyles.css';
import MainBoardBlocks from './MainBoardBlocks';

function MainBoardPage(props) {
    const { language, setLocalization, user } = props;
    let [newLang, setLang] = useState(language);

    return (
        <>
            <AdminSideMenu language={newLang} />

            <DivWithShift>
                <PageTitle>{localization.mainBoardPage.title[newLang]}</PageTitle>
                <MainBoardBlocks language={newLang} />
            </DivWithShift>
            <LocalizationButton onClick={() => changeLocalization(setLang, newLang, setLocalization)}>
                {changeLang(newLang)}
            </LocalizationButton>
        </>
    )
}

const storeToProps = (store) => ({
    language: store.language,
    user : store.user
});

const dispatchToProps = (dispatcher) => ({
    setLocalization: (lang) => dispatcher(setLocalization(lang))
});

export default connect(storeToProps, dispatchToProps)(MainBoardPage);