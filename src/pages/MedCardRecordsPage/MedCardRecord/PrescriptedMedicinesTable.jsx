import localization from "../../../localization/localization.json";
import React from "react";
import { MedicinesTable, TableHeader, TD } from "./StyledComponent";
import { NavLink } from 'react-router-dom';

function PrescriptedMedicinesTable(props) {
    const { language, medicines, setActualColumn } = props;

    return (
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
                    medicines.map(med => {
                        return (
                            <tr key={med.id}>
                                <TD> {med.title} </TD>
                                <TD> {med.medType} </TD>
                                <TD> {med.dosage !== null ? med.dosage : ''} </TD>
                                <TD> {med.howToUse !== null ? med.howToUse : ''}</TD>
                                {setActualColumn ? <TD>{med.isActual ? '+' : '-'}</TD>
                                    :
                                    <TD>
                                        <NavLink className='smallButton' to={`/medrecord/${med.medRecordId}`}>{localization.recordButton[language]}</NavLink>
                                        {/* <input type="button" className="button" value={localization.openRecordButton[language]} onClick={() => { setRedirectId(med.medRecordId) }} /> */}
                                    </TD>}
                                {/* { redirectId === med.medRecordId ? <Redirect to={`/medrecord/${med.medRecordId}`} /> : undefined} */}
                            </tr>
                        )
                    })
                }
            </tbody>
        </MedicinesTable>
    )
}

export default PrescriptedMedicinesTable;