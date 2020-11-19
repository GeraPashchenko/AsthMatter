import React from "react";
import localization from '../../../localization/localization.json';
import { FlexRow, FlexColumn, Block } from '../MainBoardPage/StyledComponent';
import { connect } from "react-redux";

class MainBoardBlocks extends React.Component {
    constructor(props) {
        super();
        this.setState = this.setState.bind(this);
        this.state = { values : {}, fetchDone : false};
        this.serverAddress = props.serverAddress;
    }

    getValues() {
        fetch(`${this.serverAddress}/mainboard`, {
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
            else {
                this.setState({ values: data, fetchDone : true });
            }
        }).catch(err => alert("Error: " + err.message));
    }

    async componentDidMount() {
        this.getValues();
    }

    render() {
        return (
            <FlexColumn>
                <FlexRow>
                <Block href='/patients'>
                        {localization.mainBoardPage.patients[this.props.language]}
                            <br></br>
                            {this.state.fetchDone ? ` ${this.state.values.patientsCount}` : ''}
                        
                    </Block>
                    <Block href='/doctors'>
                        {localization.mainBoardPage.doctors[this.props.language]}
                            <br></br>
                            {this.state.fetchDone ? ` ${this.state.values.doctorsCount}` : ''}
                        </Block>
                    <Block href='/admins'>
                        {localization.mainBoardPage.admins[this.props.language]}
                            <br></br>
                            {this.state.fetchDone ? ` ${this.state.values.adminsCount}` : ''}
                        </Block>
                </FlexRow>
                <Block>{localization.mainBoardPage.totalUsers[this.props.language]}
                    <br></br>
                    {this.state.fetchDone ? ` ${this.state.values.usersCount}` : ''}
                </Block>
            </FlexColumn>
        )
    }
}

const storeToProps = (store) => ({
    serverAddress : store.serverAddress
});

export default connect(storeToProps, null)(MainBoardBlocks);