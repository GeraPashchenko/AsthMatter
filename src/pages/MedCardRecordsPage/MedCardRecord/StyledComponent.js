import styled from "styled-components";

export const RecordBlock = styled.div`
    margin: 10px;
    width: 700px;
    padding: 10px;
    background-color: #f2f2f2;
`;

export const FlexCenter = styled.div`
  width: 1000px;
  text-align: center;
`;

export const TextBlock = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    line-height: normal;
    margin: 10px;
`;

export const Title = styled.span`
    font-family: 'Roboto', sans-serif;
    font-size: 19px;
    font-weight: bold;
`;

export const Text = styled.span`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
`;

export const RightTextBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    line-height: normal;
    margin: 8px;
`;

export const MedicinesTable = styled.table`
  width: 650px;
  background-color: #E8E8E8;
  border-left: 1px solid #A7A7A7;
  border-top: 1px solid #A7A7A7;
  border-right: 1px solid #A7A7A7;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  text-align: center;
`;

export const TableHeader = styled.th`
  text-align: center;
  font-size: 19px;
  font-weight: 200;
  padding: 5px;
  border-right: 1px solid #A7A7A7;
  border-bottom: 1px solid #A7A7A7;
`;

export const TD = styled.td`
  font-size: 18px;
  border-right: 1px solid #A7A7A7;
  border-bottom: 1px solid #A7A7A7;
  padding: 10px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormFieldDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px;
`;

export const LabelField = styled.span`
  margin-right: 10px;
  font-size: 25px;
  font-family: 'Roboto', sans-serif;
  margin-right: 10px;
  margin-bottom: 25px;
`;

export const InputForm = styled.input`
  width: 200px;
  height: 25px;
  background-color: white;
  border: 0.5px solid black;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 25px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 20px;
`;

export const FormHeader = styled.h1`
 font-weight: 100;
`;

export const LabelDivForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 130px;
`;

export const Block = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    display: flex;
    justify-content: justify;
    flex-direction: row;
    align-items: flex-start;
    line-height: normal;
    margin: 8px;
`;

export const DivWithShift = styled.div`
  position: absolute;
  left:25%;
  margin-right: 5px; 
`;

export const ErrorDiv = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: red;
  margin: 5px;
  text-align: center;
`;

export const FlexCenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;