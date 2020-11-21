import React from "react";
import {connect} from "react-redux";
import {
  ChartDiv,
  ChoosePeriodDiv,
  ChoosePeriodList
} from './StyledComponent';
import './style.css';
import {setAttackList, createAttack, deleteAttack, updateAttack} from '../../redux/actions/index';
import {LocalizationButton, PageTitle} from "../../shared/styles/HeaderStyles";
import {changeLang, changeLocalizationClass} from "../../localization/localizationFunctions";
import AttacksTable from "./Table/AttacksTable";
import {Redirect} from "react-router-dom";
import {DivWithShift} from '../MedCardRecordsPage/MedCardRecord/StyledComponent';
import localization from '../../localization/localization.json';
import PatientSideMenu from '../../menus/PatientSideMenu';
import ChartFunc from "./Chart/ChartElement";

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

//get month number
function getMonthNumber(monthStr) {
  let month = monthStr.split(' / ')[0];

  if (localStorage.getItem('language') === 'en') {
    return new Date(monthStr + '-1-01').getMonth() + 1
  } else {
    let monthNamesUa = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
    return monthNamesUa.indexOf(month) + 1;
  }
}

function getMonthRecords(state, month, userId) {
  let records = state.attackList || [];
  const monthReworkedRecords = [];

  if (records.length) {
    records = records.filter(record => new Date(record.wasAt).getMonth() + 1 === +month && record.patientId === 8);
    records.map(record => {
      monthReworkedRecords.push([
        new Date(record.wasAt).getDate(),
        new Date(record.wasAt).getHours()
      ])
    });
    return monthReworkedRecords;
  }
}

class AttacksDiary extends React.Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.setAttackList = props.setAttackList;
    this.serverAddress = props.serverAddress;
    this.createAttack = props.createAttack;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.language = localStorage.getItem('language');
    this.state = {
      attackList: props.attackList,
      language: this.language,
      statistics: [],
      makeTable: false,
      setGraph: false
    };
    this.setState = this.setState.bind(this);
    this.date = new Date();
  }


  handleChange(event) {
    let records = getMonthRecords(this.state, event.target.value, this.user.id);

    if (records.length) {
      this.setState({statistics: records, setGraph: true});
    } else {
      this.setState({setGraph: false});
    }
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
        this.setState({attackList: data.records, statistics: data.statistics, makeTable: true});
      }
    }).catch(error => {
      // alert("Error: " + error.message);
    });
  }

  render() {
    return (
      <>
        <PatientSideMenu language={this.state.language}/>

        <DivWithShift>
          <PageTitle>{localization.attacksDiary.mainPage.attacksDiary[this.state.language]}</PageTitle>
          <ChoosePeriodDiv>
            <ChoosePeriodList onChange={this.handleChange}>{getMonthList(this.state.language).map(month => {
              return (<option value={getMonthNumber(month)}> {month} </option>)
            })
            } </ChoosePeriodList>
          </ChoosePeriodDiv>

          {/*{this.state.makeTable === true ? (<AttacksTable state={this.state}/>) : null}*/}
          <AttacksTable state={this.state}/>
        </DivWithShift>

        <LocalizationButton onClick={() => {
          changeLocalizationClass(this.setState, this.state.language)
        }}>
          {changeLang(this.state.language)}
        </LocalizationButton>


        {this.state.setGraph ? (<ChartDiv><ChartFunc data={this.state.statistics} language={this.state.language}/></ChartDiv>) : null}
      </>
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