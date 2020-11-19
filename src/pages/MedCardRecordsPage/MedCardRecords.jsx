import React from "react";
import MedRecord from "./MedCardRecord/MedRecord";
import { connect } from "react-redux";
import RecordsFilterForm from "./RecordsFilterForm";
import { Block, FlexCenter } from './MedCardRecord/StyledComponent';
import { DivFlexColumn } from "../InhalerPage/InhalerForm/StyledComponent";
import localization from '../../localization/localization.json';
import { Title } from './MedCardRecord/StyledComponent';

class MedCardRecords extends React.Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.user = JSON.parse(localStorage.getItem('user'));
        this.serverAddress = props.serverAddress;
        this.state = { records: [], error : false, fetchDone : false }
    }

    handleSubmit(event) {
        event.preventDefault();
        let fromDate = event.target.from.value;
        let toDate = event.target.to.value;

        if (fromDate > toDate) {
            this.setState({ error: true });
        }
        else {
            this.setState({ error: false });
            const data = {
                from: fromDate,
                to: toDate
            }

            fetch(`${this.serverAddress}/medrecords/filter/${this.user.id}?from=${data.from}&to=${data.to}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(responce => {
                return responce.json()
            }).then(data => {
                if (data.error != null) {
                    throw new Error(data.error);
                }
                else{
                    this.setState({ records : data });
                }
            }).catch(err => alert("Error: " + err.message));
        }
    }

    getRecords() {
        fetch(`${this.serverAddress}/medrecords/${this.user.id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(responce => {
            return responce.json()
        }).then(data => {
            if (data.error != null) {
                throw new Error(data.error);
            }
            if (data.length > 0) {
                this.setState({
                    records: data,
                    maxDate: data[0].createdAt.split("T")[0],
                    minDate: data[data.length - 1].createdAt.split("T")[0],
                    fetchDone : true
                });
            } else {
                this.setState({ records: data, fetchDone : true });
            }
        }).catch(err => alert("Error: " + err.message));
    }

    async componentDidMount() {
        this.getRecords();
    }

    render() {
        return (
            <>
                {this.state.records.length > 0 ?
                    <Block>
                        <DivFlexColumn>
                            {
                                this.state.records.map(rec => {
                                    return (<MedRecord key={rec.id} record={rec} language={this.props.language} setButton={true}/>)
                                })
                            }
                        </DivFlexColumn>
                        <RecordsFilterForm from={this.state.minDate}
                            to={this.state.maxDate}
                            language={this.props.language}
                            error={this.state.error}
                            handleSubmit={this.handleSubmit} />
                    </Block>
                    :
                    this.state.fetchDone ?
                    <FlexCenter>
                        <Title>{localization.MedCard.medCardRecordsPage.noRecords[this.props.language]}</Title>
                    </FlexCenter>
                    :
                    undefined
                }
            </>
        )
    }
}

const storeToProps = (store) => ({
    serverAddress: store.serverAddress
});

export default connect(storeToProps, null)(MedCardRecords);