import React, {useState} from "react";
import {createAttack} from "../../../redux/actions";
import {connect} from "react-redux";
import {Form1, SubmitBttn, LabelField1, FormFieldDiv1, LabelDivForm} from "./StyledComponent";
import DatePicker from "react-datepicker";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import "react-datepicker/dist/react-datepicker.css";
import AddAttackFetch from '../../../Submit Functions/Add Attack Form';
import localization from "../../../localization/localization.json";

function AddAttackForm(props) {
  const {createAttack, user, language} = props;
  const [startDate, setStartDate] = useState(new Date());

  return (

    <Form1 onSubmit={(event) => AddAttackFetch(event, user.id, createAttack)}>
      {/* <FormDiv> */}

        <FormFieldDiv1>
          <LabelDivForm>
            <LabelField1>{localization.attacksDiary.createNewAttackPage.date[language]}</LabelField1>
            <DatePicker name='date' selected={startDate} onChange={date => setStartDate(date)}/>
          </LabelDivForm>
        </FormFieldDiv1>

        <FormFieldDiv1>
          <LabelDivForm>
            <LabelField1>{localization.attacksDiary.createNewAttackPage.time[language]}</LabelField1>
            <TimePicker name='time'/>
          </LabelDivForm>
        </FormFieldDiv1>

        <FormFieldDiv1>
        <LabelDivForm>
          <LabelField1>{localization.attacksDiary.createNewAttackPage.date[language]}</LabelField1>
          <input type="text" name="reason"/>
        </LabelDivForm>
      </FormFieldDiv1>

        <SubmitBttn> {localization.attacksDiary.createNewAttackPage.date[language]} </SubmitBttn>
      {/* </FormDiv> */}
    </Form1>

  )
}

const storeToProps = (store) => ({
  language: store.language,
  user: store.user
});

const dispatcherToProps = (dispatcher) => ({
  createAttack: (newAttack) => dispatcher(createAttack(newAttack))
});

export default connect(storeToProps, dispatcherToProps)(AddAttackForm);