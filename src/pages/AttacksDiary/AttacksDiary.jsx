import React from "react";
import {connect} from "react-redux";
import {
  AttacksPage,
  ChoosePeriodDiv,
  ChoosePeriodList,
  DeleteBttn,
  PageHeader,
  Table,
  TableD,
  TableRow, UpdateBttn
} from './StyledComponent';
import './style.css';
import {setAttackList, setLocalization, createAttack, deleteAttack, updateAttack} from '../../redux/actions/index';
import {LocalizationButton} from "../../shared/styles/HeaderStyles";
import {changeLang, changeLocalizationClass} from "../../localization/localizationFunctions";
import AddAttackForm from "../AddAttackPage/AddAttackRecordForm/AddAttackForm";
import localization from '../../localization/localization.json';
import PatientSideMenu from "../../menus/PatientSideMenu";

async function getAttackList(userId, date) {

  const response = await fetch(`/attackrecords/${userId}?date=${date}`, {method: 'GET'});
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
}


function getMonthList() {
  let date = new Date();
  let months = [],
    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < 12; i++) {
    months.push(monthNames[date.getMonth()] + ' / ' + date.getFullYear());
    date.setMonth(date.getMonth() - 1);
  }
  return months;
}

function formatDate(date) {
  date = new Date(Date.parse(date));
  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

 function createAttacksTable(attacksList, updateFun, deleteFun){
  let resTableBody = '';
  let resTableRow = '';

  for(let i = 0; i < attacksList.length; i++ ){
    resTableRow += `<tr><td>${formatDate(attacksList[i].wasAt)}</td><td>${new Date(Date.parse(attacksList[i].wasAt)).toTimeString()}</td><td>`;
    for(let j = 0; j < attacksList[i].selectedReasons.length; j++){
      resTableRow += attacksList[i].selectedReasons[j] + "; ";
    }
    resTableRow += `</td></tr>`;
  }
  return resTableRow;
}

class AttacksDiary extends React.Component {
  constructor(props) {
    super();
    this.monthList = getMonthList();
    this.setLocalization = props.setLocalization;
    this.createAttack = props.createAttack;
    this.deleteAttack = props.deleteAttack;
    this.updateAttack = props.updateAttack;
    this.user = props.user;
    this.attackList = props.attackList;
    this.state = {attackList: this.attackList, language: props.language};
    this.setState = this.setState.bind(this);
    this.date = new Date();
  }

  async componentDidMount() {
    // alert(this.user.id)
    // alert(`https://localhost:5001/attackrecords/${this.user.id}?date=${this.date.toDateString()}`);
    fetch(`https://localhost:5001/attackrecords/${this.user.id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(responce => {
      return responce.json()
    }).then(data => {
      if(data.message != null){
        throw new Error(data.message);
      }
      else{
        this.setState(() => ({attackList: data.records, statistics : data.statistics}));
      }
    //  alert(JSON.stringify(data));
    }).catch(error => alert("Error: " + error.message));
    // let attackList = await getAttackList(this.user.id, this.date);
    // alert(JSON.stringify(attackList));
    // // alert(JSON.stringify(this.user))
    // this.setState(() => ({attackList: attackList}));
  }

  render() {
    return (

      <AttacksPage>
        <LocalizationButton onClick={() => {
          changeLocalizationClass(this.setState, this.state.language, setLocalization)
        }}>{changeLang(this.state.language)}</LocalizationButton>

        <PageHeader> Attacks Diary </PageHeader>
        <ChoosePeriodDiv>
          <ChoosePeriodList>{this.monthList.map(month => {
            return (<option> {month} </option>)
          })
          } </ChoosePeriodList>
        </ChoosePeriodDiv>
        <Table>
        {/* {
        "records":[
          {"id":1017,"wasAt":"2020-11-06T19:56:34","patientId":7,"selectedReasons":["dust","dog"]},
          {"id":1018,"wasAt":"2020-11-06T19:56:34","patientId":7,"selectedReasons":["dust","flowers"]},
          {"id":1023,"wasAt":"2020-11-08T18:23:28","patientId":7,"selectedReasons":["sdasd"]}],
        "statistics":{"dust":2,"dog":1,"flowers":1,"sdasd":1}
        } */}
        <thead>
          <th>{localization.attacksDiary.mainPage.date[this.state.language]}</th>
          <th>{localization.attacksDiary.mainPage.time[this.state.language]}</th>
          <th>{localization.attacksDiary.mainPage.reasons[this.state.language]}</th>
        </thead>
        <tbody>{ createAttacksTable(this.state.attackList) }</tbody>
        </Table>
        {/* <Table>
          <tbody>
          <TableRow><TableD> Monday
            21.10 </TableD><TableD> 11:40 </TableD><TableD> Allergy </TableD><TableD> <UpdateBttn> UPDATE </UpdateBttn>
          </TableD><TableD> <DeleteBttn> DELETE </DeleteBttn> </TableD></TableRow>
          <TableRow><TableD> Monday
            21.10 </TableD><TableD> 11:40 </TableD><TableD> Allergy </TableD><TableD> <UpdateBttn> UPDATE </UpdateBttn>
          </TableD><TableD> <DeleteBttn> DELETE </DeleteBttn> </TableD></TableRow>
          <TableRow><TableD> Monday
            21.10 </TableD><TableD> 11:40 </TableD><TableD> Allergy </TableD><TableD> <UpdateBttn> UPDATE </UpdateBttn>
          </TableD><TableD> <DeleteBttn> DELETE </DeleteBttn> </TableD></TableRow>
          <TableRow><TableD> Monday
            21.10 </TableD><TableD> 11:40 </TableD><TableD> Allergy </TableD><TableD> <UpdateBttn> UPDATE </UpdateBttn>
          </TableD><TableD> <DeleteBttn> DELETE </DeleteBttn> </TableD></TableRow>
          <TableRow><TableD> Monday
            21.10 </TableD><TableD> 11:40 </TableD><TableD> Allergy </TableD><TableD> <UpdateBttn> UPDATE </UpdateBttn>
          </TableD><TableD> <DeleteBttn> DELETE </DeleteBttn> </TableD></TableRow>
          </tbody>
        </Table> */}

        {/* <AddAttackForm/> */}
      </AttacksPage>
    )
  }
}

const storeToProps = (store) => ({
  user: store.user,
  language: store.language,
  attackList: store.attackList
});

const dispatcherToProps = (dispatcher) => ({
  setAttackList: (attackList) => dispatcher(setAttackList(attackList)),
  setLocalization: (lang) => dispatcher(setLocalization(lang)),
  createAttack: (newAttack) => dispatcher(createAttack(newAttack)),
  deleteAttack: (attackId) => dispatcher(deleteAttack(attackId)),
  updateAttack: (attackId, updatedAttack) => dispatcher(updateAttack(attackId, updatedAttack)),
});

export default connect(storeToProps, dispatcherToProps)(AttacksDiary);