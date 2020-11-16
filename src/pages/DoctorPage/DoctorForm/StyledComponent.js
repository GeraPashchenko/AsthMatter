import styled from "styled-components";
import { List } from '../../../shared/styles/FormStyles';

export const LabelDivForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 200px;
`;

export const DivFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DivWithShift = styled.div`
  position: absolute;
  left: 40%; 
`;

export const FormButton = styled.button`
  background-color: #96A8D6;
  border-radius: 20px;
  border: 0px solid;
  padding: 10px;
  font-size: 20px;
  width: 180px;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 25px;
`;

export const FormFieldDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px;
`;

export const LabelField = styled.span`
  font-size: 25px;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 25px;
`;

export const InputForm = styled.input`
  width: 320px;
  height: 25px;
  background-color: white;
  border: 0.5px solid black;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 10px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 15px;
`;

export const SelectDoctorList = styled(List)`
  width: 320px;
  background-color: white;
`;