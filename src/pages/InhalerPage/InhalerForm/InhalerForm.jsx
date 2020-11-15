import React from "react";
import { FormButton, Form, LabelField, InputForm, FormFieldDiv } from "./StyledComponent";
import { setInhalerId, setUser } from "../../../redux/actions";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';

class InhalerFormElement extends React.Component {
    constructor(props) {
        super();
        this.state = { inhalerId: '' };
        this.setUser = props.setUser;
        this.user = props.user;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setState = this.setState.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = {
            inhalerId: event.target.inhalerId.value,
        }

        fetch(`https://localhost:5001/patients/inhaler/${this.user.id}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(responce => {
            return responce.json()
        }).then(data => {
            this.setState(() => ({ inhalerId: data.inhalerId }));
        }).catch(err => {
            alert(err.message);
        });
    }

    handleChange(event) {
        event.persist();
        this.setState(() => ({ inhalerId: event.target.value }));
    }

    getInhalerId(userId) {
        fetch(`https://localhost:5001/patients/inhaler/${userId}`, {
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
                    <InputForm name={'inhalerId'} type='text' value={this.state.inhalerId} required onChange={this.handleChange} />
                </FormFieldDiv>
                <FormButton> {localization.saveButton[this.props.language]} </FormButton>
            </Form>
        )
    }
}

const storeToProps = (store) => ({
    user: store.user,
});

const dispatcherToProps = (dispatcher) => ({
    setUser: (user) => dispatcher(setUser(user)),
});

export default connect(storeToProps, dispatcherToProps)(InhalerFormElement);
