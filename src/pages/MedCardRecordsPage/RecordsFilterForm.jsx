import React from "react";
import { Form, FormHeader, InputForm, LabelDivForm, FormFieldDiv, LabelField, ErrorDiv } from "./MedCardRecord/StyledComponent";
import localization from '../../localization/localization.json';

class RecordsFilterForm extends React.Component {
    constructor(props) {
        super();
        this.from = props.from;
        this.to = props.to;
        this.handleSubmit = props.handleSubmit;
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
        <FormHeader> {localization.MedCard.medCardRecordsPage.filter[this.props.language]} </FormHeader>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.MedCard.medCardRecordsPage.from[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm type='date' name={'from'} defaultValue={this.from} min={this.from} max={this.to}/>

                </FormFieldDiv>
                <FormFieldDiv>
                    <LabelDivForm>
                        <LabelField>{localization.MedCard.medCardRecordsPage.to[this.props.language]}:</LabelField>
                    </LabelDivForm>
                    <InputForm type='date' name={'to'} defaultValue={this.to} min={this.from} max={this.to}/>
                </FormFieldDiv>

                <ErrorDiv>
                {this.props.error === true ? localization.MedCard.medCardRecordsPage.invalidFiltering[this.props.language] : undefined}
                </ErrorDiv>

                <input type="submit" className="button" value={localization.MedCard.medCardRecordsPage.filterButton[this.props.language]} />
            </Form>
        )
    }
}

export default RecordsFilterForm;
