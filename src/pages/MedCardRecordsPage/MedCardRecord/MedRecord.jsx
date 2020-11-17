import React from "react";
import { RecordBlock, TextBlock, Title } from '../MedCardRecord/StyledComponent';
import localization from '../../../localization/localization.json';
function MedRecord(props){
  const [record, language] = props;

  return(
    <RecordBlock>
        <TextBlock>
            <Title>{`${localization.MedCard.medCardRecordsPage[language]}: `}</Title>
            <Text>
                {`${record.doctor.user.surname} ${record.doctor.user.name} ${record.doctor.user.patronymic == null ? '' : record.doctor.user.patronymic}`}
            </Text>
            <Title>{new Date(record.createdAt)}</Title>
        </TextBlock>

    </RecordBlock>
  )
}

export default SignUpTimeZone;