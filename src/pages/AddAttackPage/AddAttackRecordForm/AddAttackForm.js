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
  const {createAttack, serverAddress} = props;
  const [startDate, setStartDate] = useState(new Date());
  const user = JSON.parse(localStorage.getItem('user'));
  const language = JSON.parse(localStorage.getItem('language'));


  return (

    <Form1 onSubmit={(event) => AddAttackFetch(event, user.id, createAttack, serverAddress)}>
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
  serverAddress : store.serverAddress
});

const dispatcherToProps = (dispatcher) => ({
  createAttack: (newAttack) => dispatcher(createAttack(newAttack))
});

export default connect(storeToProps, dispatcherToProps)(AddAttackForm);