import React from "react";
import {connect} from "react-redux";
import {
  AttacksPage,
  ChoosePeriodDiv,
  ChoosePeriodList,
  PageHeader
} from './StyledComponent';
import './style.css';
import {setAttackList, setLocalization, createAttack, deleteAttack, updateAttack} from '../../redux/actions/index';
import {LocalizationButton} from "../../shared/styles/HeaderStyles";
import {changeLang, changeLocalizationClass} from "../../localization/localizationFunctions";
import AttacksTable from "./Table/AttacksTable";
import {Redirect} from "react-router-dom";
import Chart from "./Chart/ChartElement";

function getMonthList(lang) {
  let date = new Date();
  let months = [];

  let monthNamesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthNamesUa = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

  let monthNames = lang === 'ua' ? monthNamesUa : monthNamesEN;

  for (let i = 0; i < 12; i++) {
    months.push(monthNames[date.getMonth()] + ' / ' + date.getFullYear());
    date.setMonth(date.getMonth() - 1);
  }

  return months;
}


class AttacksDiary extends React.Component {
  constructor(props) {
    super();
    this.setLocalization = props.setLocalization;
    this.setAttackList = props.setAttackList;
    this.serverAddress = props.serverAddress;
    this.createAttack = props.createAttack;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.language = JSON.parse(localStorage.getItem('language'));
    this.state = {attackList: props.attackList, language: this.language, statistics: props.statistics, makeTable: false};
    this.setState = this.setState.bind(this);
    this.date = new Date();
  }

  async componentDidMount() {

    fetch(`${this.serverAddress}/attackrecords/${this.user.id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(responce => {
      return responce.json()
    }).then(data => {
      if (data.message != null) {
        throw new Error(data.message);
      } else {
        this.setAttackList(data.records);
        this.setState(() => ({attackList: data.records, statistics: data.statistics, makeTable: true}));
      }
    }).catch(error => {
      alert("Error: " + error.message);
    });
  }

  render() {
    return (

      <AttacksPage>
        <LocalizationButton onClick={() => {
          changeLocalizationClass(this.setState, this.state.language, setLocalization)}}>
          {changeLang(this.state.language)}
        </LocalizationButton>

        <PageHeader> Attacks Diary </PageHeader>
        <ChoosePeriodDiv>
          <ChoosePeriodList>{getMonthList(this.state.language).map(month => {
            return (<option> {month} </option>)
          })
          } </ChoosePeriodList>
        </ChoosePeriodDiv>

        {/*{this.state.makeTable === true ? (<AttacksTable state={this.state}/>) : null}*/}
        <AttacksTable state={this.state}/>

        <Chart data={this.state.statistics}/>

      </AttacksPage>
    )
  }
}

const storeToProps = (store) => ({
  attackList: store.attackList,
  serverAddress: store.serverAddress
});

const dispatcherToProps = (dispatcher) => ({
  setAttackList: (attackList) => dispatcher(setAttackList(attackList)),
  createAttack: (newAttack) => dispatcher(createAttack(newAttack)),
  deleteAttack: (attackId) => dispatcher(deleteAttack(attackId)),
  updateAttack: (attackId, updatedAttack) => dispatcher(updateAttack(attackId, updatedAttack)),
});

export default connect(storeToProps, dispatcherToProps)(AttacksDiary);