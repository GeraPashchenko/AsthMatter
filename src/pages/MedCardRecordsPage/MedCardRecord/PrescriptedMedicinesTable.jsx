import localization from "../../../localization/localization.json";
import React, {useState} from "react";
import { MedicinesTable, TableHeader, TD } from "./StyledComponent";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { Title } from './StyledComponent';

function PrescriptedMedicinesTable(props) {
    const { language, medicines, setActualColumn, setDeleteColumn } = props;
    var [meds, setMedicines] = useState(medicines);
    let serverAddress = props.serverAddress;

    return (
        <>
        {meds.length > 0 ? 
        <MedicinesTable>
            <thead>
                <tr>
                    <TableHeader>{localization.medicinesTable.title[language]}</TableHeader>
                    <TableHeader>{localization.medicinesTable.type[language]}</TableHeader>
                    <TableHeader>{localization.medicinesTable.dosage[language]}</TableHeader>
                    <TableHeader>{localization.medicinesTable.howToUse[language]}</TableHeader>
                    {setActualColumn ? <TableHeader>{localization.medicinesTable.isActual[language]}</TableHeader>
                        :
                        <TableHeader></TableHeader>}
                </tr>
            </thead>
            <tbody>
                {
                    meds.map(med => {
                        return (
                            <tr key={med.id}>
                                <TD> {med.title} </TD>
                                <TD> {med.medType} </TD>
                                <TD> {med.dosage !== null ? med.dosage : ''} </TD>
                                <TD> {med.howToUse !== null ? med.howToUse : ''}</TD>
                                {setActualColumn ? <TD>{med.isActual ? '+' : '-'}</TD>
                                    :
                                    setDeleteColumn ?
                                    <TD>
                                        <NavLink className='greenButton' to={`/medrecord/${med.medRecordId}`}>
                                            {localization.recordButton[language]}
                                        </NavLink>
                                        <input type="button" className="deleteButton" value={localization.deleteButton[language]} 
                                            onClick={() => makeUnactual(language, med, setMedicines, meds, serverAddress)} />
                                    </TD>
                                    :
                                    <TD>
                                    <NavLink className='greenButton' to={`/medrecord/${med.medRecordId}`}>
                                        {localization.recordButton[language]}
                                        </NavLink>
                                    </TD>
                                    }
                            </tr>
                        )
                    })
                }
            </tbody>
        </MedicinesTable>
        :
        <Title>{localization.medicinesPage.noActualMedicines[language]}</Title>
    }
    </>)
}

function makeUnactual(language, medicine, setMedicines, meds, serverAddress){
        let str = `${localization.makeUnactualConfirm[language]} 
            ${localization.medicineData[language]}:
            ${localization.medicinesTable.title[language]} : ${medicine.title}
            ${localization.medicinesTable.type[language]}: ${medicine.medType}
            ${localization.medicinesTable.dosage[language]}: ${medicine.dosage !== null ? medicine.dosage : '-'}
            ${localization.medicinesTable.howToUse[language]}: ${medicine.howToUse !== null ? medicine.howToUse : '-'}`;
    
        let deleteFlag = window.confirm(str);

        if (deleteFlag) {
            fetch(`${serverAddress}/medicines/${medicine.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json"
                }
            }).then(responce => {
                return responce.json()
            }).then(data => {
                if (data.error != null) {
                    throw new Error(data.error);
                }else{
                    let temp = meds;
                    temp.splice(meds.findIndex(med => med.id === medicine.id), 1);
                    setMedicines([...temp]);
                }
            }).catch(err => alert("Error: " + err.message));
        }
}

const storeToProps = (store) => ({
    serverAddress : store.serverAddress
});

export default connect(storeToProps, null)(PrescriptedMedicinesTable);