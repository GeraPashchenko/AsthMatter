import styled from "styled-components";

export const DivFlexRow = styled.div`  
  display: flex;
  flex-direction: row;
  justify-content: justify;
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
`;