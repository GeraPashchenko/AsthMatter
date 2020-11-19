import localization from "../../../localization/localization.json";
import React from "react";
import {deleteAttack, updateAttack} from "../../../redux/actions";
import {connect} from "react-redux";
import {AttacksTable, TableBttn, TableHeader, TD} from "./StyledComponent";

async function CreateAttacksTable(props) {
  const {state, deleteAttack, updateAttack} = props;

  return (
    <AttacksTable>
      <TableHeader>{localization.attacksDiary.mainPage.date[state.language]}</TableHeader>
      <TableHeader>{localization.attacksDiary.mainPage.time[state.language]}</TableHeader>
      <TableHeader>{localization.attacksDiary.mainPage.reasons[state.language]}</TableHeader>
      <TableHeader></TableHeader>

      <tbody>
      {state.attackList.map(attack => {
        return (<tr>
          <TD> {formatDate(attack.wasAt)} </TD>
          <TD> {new Date(Date.parse(attack.wasAt)).toLocaleTimeString()} </TD>
          <TD> {attack.selectedReasons.join(' ; ')} </TD>
          <TD>
            <TableBttn type='button'
                       value={localization.attacksDiary.mainPage.editRecord[state.language]}
                       onClick={(e) => { updateAttack(e)} }/>
            <TableBttn type='button'
                       value={localization.attacksDiary.mainPage.deleteRecord[state.language]}
                       onClick={(e) => { deleteAttack(e) }}/>
          </TD>
        </tr>)
      })}
      </tbody>

    </AttacksTable>
  )
}

function formatDate(date) {
  date = new Date(Date.parse(date));
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

const dispatcherToProps = (dispatcher) => ({
  deleteAttack: (attackId) => dispatcher(deleteAttack(attackId)),
  updateAttack: (attackId, updatedAttack) => dispatcher(updateAttack(attackId, updatedAttack)),
});

export default connect(null, dispatcherToProps)(CreateAttacksTable);