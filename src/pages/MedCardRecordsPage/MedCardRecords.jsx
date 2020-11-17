import React, { useState } from "react";
import localization from '../../localization/localization.json';
import MedRecord from "./MedCardRecord/MedRecord";
import { setUser } from "../../redux/actions";
import { connect } from "react-redux";

// function MedCardRecords(props) {
//     const { records, handleChange, language } = props;
//     const [data, setData] = useState(records);

//     return (
//         records.map(rec => {
//             <MedRecord record={rec} language={language} />
//         })
//     )
// }

// export default MedCardRecords;

class MedCardRecords extends React.Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.user = props.user;
        this.setUser = props.setUser;
        this.state = { records: [] }
    }

    handleSubmit(event) {
        // event.preventDefault();
        // const data = {
        //     id : event.target.id.value,
        //     userId : event.target.userId.value,
        //     birthday: event.target.birthday.value,
        //     height: event.target.height.value,
        //     weight: event.target.weight.value,
        //     bloodGroup: event.target.bloodGroup.value,
        //     allergies: event.target.allergies.value,
        //     emergencyContact: event.target.emergencyContact.value,
        //     address: event.target.address.value
        // }

        // fetch(`https://localhost:5001/patients/edit/${this.user.id}`, {
        //     method: 'PUT',
        //     credentials: 'include',
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        //   }).then(responce => {
        //     return responce.json()
        //   }).then(data => {
        //     if (data.error != null) {
        //       throw new Error(data.error);
        //     }
        //   }).catch(err => alert("Error: " + err.message));
    }

    getRecords(userId) {
        fetch(`https://localhost:5001/medrecords/${userId}`, {
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
            }
            else {
                console.log(JSON.stringify(data));
                this.setState(() => ({ records: data }));
            }
        }).catch(err => alert("Error: " + err.message));
    }

    async componentDidMount() {
        this.getRecords(this.user.id);
    }

    render() {
        return ( 
                this.state.records.map(rec => {
                    return (<MedRecord record={rec} language={this.props.language} />)
                })
        )
    }
}

const storeToProps = (store) => ({
    user: store.user
});

const dispatcherToProps = (dispatcher) => ({
    setUser: (user) => dispatcher(setUser(user))
});

export default connect(storeToProps, dispatcherToProps)(MedCardRecords);