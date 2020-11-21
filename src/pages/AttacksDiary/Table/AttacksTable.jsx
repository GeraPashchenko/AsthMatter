import localization from "../../../localization/localization.json";
import React, {useState} from "react";
import {AttacksTable, TableBttn, TableHeader, TD} from "./StyledComponent";
import { formatDate, formatTime } from '../../../dates/datesFunctions';
import {Redirect} from "react-router";
import {connect} from "react-redux";

function deleteAttackRecord(attackId, serverAddress){

  console.log(attackId, serverAddress)
  // fetch(`${serverAddress}/profiles/changePassword/${attackId}`, {
  //   method: 'DELETE',
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // }).then(responce => {
  //   return responce.json()
  // }).then(data => {
  //   if (data) {
  //     throw new Error(data.error);
  //   }
  // }).catch(err => alert("Error: " + err.message));
}

function CreateAttacksTable(props) {
  const {state, serverAddress} = props;
  const [attackList, setAttackList] = useState(state.attackList);
  const [updateAttack, setUpdate] = useState(false);
  const [data, setData] = useState({event: '', language: state.language})

  return (
    <AttacksTable>
      <TableHeader>{localization.attacksDiary.mainPage.date[state.language]}</TableHeader>
      <TableHeader>{localization.attacksDiary.mainPage.time[state.language]}</TableHeader>
      <TableHeader>{localization.attacksDiary.mainPage.reasons[state.language]}</TableHeader>
      <TableHeader></TableHeader>

      <tbody>
       {attackList.map(attack => {
        return (<tr>
          <TD> {formatDate(attack.wasAt)} </TD>
          <TD> {formatTime(attack.wasAt)} </TD>
          <TD> {attack.selectedReasons.join('; ')} </TD>
          <TD>
            <TableBttn key={attack.id} type='button'
                       value={localization.editButton[state.language]}
                       onClick={(e) => { setUpdate(true) }}/>
            {updateAttack ? (<Redirect to={{path: '/updateAttack', state:{event: data.event, language: data.language}}}/>) : null}

            <TableBttn key={attack.id} type='button'
                       value={localization.deleteButton[state.language]}
                       onClick={(e) => { deleteAttackRecord(e, serverAddress) }}/>
          </TD>
        </tr>)
      })}
      </tbody>

    </AttacksTable>
  )
}

const storeToProps = (store) => ({
  serverAddress: store.serverAddress
});

export default connect(storeToProps, null)(CreateAttacksTable);