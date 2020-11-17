import styled from "styled-components";
import { List } from '../../../shared/styles/FormStyles';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 25px;
`;

export const LabelDivForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 200px;
`;

export const InputForm = styled.input`
  width: 300px;
  height: 20px;
  background-color: white;
  border: 1px solid black;
  margin-left: 15px;
`;

export const TextArea = styled.textarea`
    width: 300px;
    height: 100px;
    background-color: white;
    border: 1px solid black;
    margin-left: 15px;
`;

export const FormFieldDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 600px;
  margin: 10px;
`;

export const BloodList = styled(List)`
    width: 306px;
    margin-left: 15px;
    height: 24px;
    background-color: white;
    border: 1px solid black;
    padding: 2px;
`;

export const Name = styled.span`
  width: 500px;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
`;

export const LabelField = styled.span`
    width: 300px;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
`;