import React, {useState} from "react";
import { RecordBlock, TextBlock, Title, Text, RightTextBlock } from './StyledComponent';
import localization from '../../../localization/localization.json';
import { formatDateTime } from '../../../dates/datesFunctions';
import PrescriptedMedicinesTable from './PrescriptedMedicinesTable';
import { Redirect, NavLink } from 'react-router-dom';

function MedRecord(props) {
    const { record, language, setButton } = props;
    let [redirectId, setRedirectId] = useState(0);

    return (
        <RecordBlock>
            <TextBlock>
                <Title>{`${localization.MedCard.medCardRecordsPage.doctor[language]}: ${record.doctor.user.surname} ${record.doctor.user.name} ${record.doctor.user.patronymic == null ? '' : record.doctor.user.patronymic}`}
                </Title>
                <Title>{formatDateTime(record.createdAt)}</Title>
            </TextBlock>
            <TextBlock>
                <Title>{`${localization.MedCard.medCardRecordsPage.information[language]}: `}
                </Title>
            </TextBlock>
            <TextBlock>
                <Text>{record.information}</Text>
            </TextBlock>
            { record.prescriptedMedicines.length > 0 ?
                <>
                    <TextBlock>
                        <Title>{`${localization.MedCard.medCardRecordsPage.prescriptedMedicines[language]}: `}</Title>
                    </TextBlock>
                    <TextBlock>
                        <PrescriptedMedicinesTable medicines={record.prescriptedMedicines} language={language} setActualColumn={true}/>
                    </TextBlock>
                </> :
                undefined
            }
            { setButton === true ? 
            <>
            <RightTextBlock>
                <NavLink className='button' to={`/medrecord/${record.id}`} >{localization.openRecordButton[language]}</NavLink>
            </RightTextBlock> 
            </>
            : undefined }
        </RecordBlock>
    )
}

export default MedRecord;