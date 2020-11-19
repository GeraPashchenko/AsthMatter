import React from "react";
import { Form, LabelField, InputForm, FormFieldDiv } from "./StyledComponent";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';

class InhalerFormElement extends React.Component {
    constructor(props) {
        super();
        this.state = { inhalerId: '' };
        this.user = JSON.parse(localStorage.getItem('user'));
        this.serverAddress = props.serverAddress;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setState = this.setState.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = {
            inhalerId: event.target.inhalerId.value,
        }

        fetch(`${this.serverAddress}/patients/inhaler/${this.user.id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(responce => {
            return responce.json()
        }).then(data => {
            if (data.error != null) {
                throw new Error(data.error);
            } else {
                this.setState(() => ({ inhalerId: data.inhalerId }));
            }
        }).catch(err => {
            alert("Error: " + err.message);
        });
    }

    getInhalerId(userId) {
        fetch(`${this.serverAddress}/patients/inhaler/${userId}`, {
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
                this.setState(() => ({ inhalerId: data.inhalerId }));
            }
        }).catch(err => alert("Error: " + err.message));
    }

    async componentDidMount() {
        this.getInhalerId(this.user.id);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormFieldDiv>
                    <LabelField>ID</LabelField>
                    <InputForm name={'inhalerId'} type='text' defaultValue={this.state.inhalerId} required />
                </FormFieldDiv>
                <input type="submit" className="button" value={localization.saveButton[this.props.language]} />
            </Form>
        )
    }
}

const storeToProps = (store) => ({
    serverAddress: store.serverAddress,
});

export default connect(storeToProps, null)(InhalerFormElement);
