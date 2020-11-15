import styled from "styled-components";
import {Link} from "react-router-dom";
import { Form, FormFieldDiv, LabelField} from '../../../shared/styles/FormStyles';

export const Form1 = styled(Form)`
  top: 200px;
  height: 320px;
`;

export const LabelDivForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 130px;
`;

export const FormFieldDiv1 = styled(FormFieldDiv)`
  width: 450px;
`;

export const LabelField1 = styled(LabelField)`
  font-size: 25px;
`;

export const SubmitBttn = styled.button`
  background-color: #96A8D6;
  border-radius: 20px;
  border: 0px solid;
  padding: 5px;
  font-size: 20px;
  width: 200px;
  cursor: pointer;
`;
