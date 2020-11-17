import React from "react";
import { RecordBlock, TextBlock, Title, Text, RightTextBlock } from '../MedCardRecord/StyledComponent';
import localization from '../../../localization/localization.json';
import { formatDateTime } from '../../../dates/datesFunctions';

function MedRecord(props) {
    const { record, language } = props;

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
            <TextBlock>
                <Title>{`${localization.MedCard.medCardRecordsPage.prescriptedMedicines[language]}: `}</Title>
            </TextBlock>
            <TextBlock>
                prescripted medicines table
        </TextBlock>
            <RightTextBlock>
                <input type="button" className="button" value={localization.openRecordButton[language]} />
            </RightTextBlock>
        </RecordBlock>
    )
}

export default MedRecord;