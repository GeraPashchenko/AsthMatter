import styled from "styled-components";
import {Form, FormFieldDiv, LabelField, InputForm} from '../../../shared/styles/FormStyles';
import { Link } from "react-router-dom";

export const SignInForm = styled(Form)`
  top: 200px;
  height: 320px;
`;

export const SignInFormFieldDiv = styled(FormFieldDiv)`
  width: 450px;
`;

export const SignInLabelField = styled(LabelField)`
  font-size: 25px;
`;

export const SignInInput = styled(InputForm)`
  height: 25px;
  width: 240px;
`;

export const SignInLink = styled(Link)`
  font-weight: 500;
  font-size: 20px;
  color: #2B4874;
  margin: 20px;
  text-decoration: underline;
`;