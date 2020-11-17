import React from "react";
import { ErrorDiv } from "../../../shared/styles/FormStyles.js";
import { Form } from "../../InhalerPage/InhalerForm/StyledComponent";
import { setUser } from "../../../redux/actions";
import { connect } from "react-redux";
import localization from '../../../localization/localization.json';
import { InputForm, LabelDivForm, FormFieldDiv, LabelField } from "./StyledComponent";
class ChangePasswordForm extends React.Component {
    constructor(props) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setState = this.setState.bind(this);
        this.user = props.user;
        this.setUser = props.setUser;
        this.state = {
            errors: {}
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = {
            oldPassword: event.target.oldPassword.value,
            newPassword: event.target.newPassword.value,
            confirmPassword: event.target.confirmPassword.value
        }

        if (this.validate(data.newPassword, data.confirmPassword)) {
            fetch(`https://localhost:5001/profiles/changePassword/${this.user.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(responce => {
                return responce.json()
            }).then(data => {
                if (data.oldPasswordError != null) {
                    this.setState({ errors: { oldPassword: true } });
                }
                else if (data.error != null) {
                    throw new Error(data.error);
                }
            }).catch(err => alert("Error: " + err.message));
        }
    }

    validate(newPassword, confirmPassword) {
        let errors = {};
        let isValid = true;

        if (newPassword !== confirmPassword) {
            isValid = false;
            errors["confirmPassword"] = true;
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.changePasswordPage.oldPassword[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <InputForm type='password' name={'oldPassword'} required maxLength='50' minLength='6' />
                    <div className="text-danger">{this.state.errors.oldPassword}</div>
                </FormFieldDiv>
                <ErrorDiv>
                    {this.state.errors.oldPassword === true ? localization.changePasswordPage.oldPasswordError[this.props.language] : undefined}
                </ErrorDiv>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.changePasswordPage.newPassword[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <InputForm type='password' name={'newPassword'} required maxLength='50' minLength='6' />
                </FormFieldDiv>

                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.changePasswordPage.confirmPassword[this.props.language]}</LabelField>
                    </LabelDivForm>
                    <InputForm type='password' name={'confirmPassword'} required maxLength='50' minLength='6' />
                </FormFieldDiv>
                <ErrorDiv>
                    {this.state.errors.confirmPassword === true ? localization.changePasswordPage.matchError[this.props.language] : undefined}
                </ErrorDiv>
                <input type="submit" className="button" value={localization.saveButton[this.props.language]} />
            </Form>
        )
    }
}

const storeToProps = (store) => ({
    language: store.language,
    user: store.user
});

const dispatcherToProps = (dispatcher) => ({
    setUser: (user) => dispatcher(setUser(user))
});

export default connect(storeToProps, dispatcherToProps)(ChangePasswordForm);
