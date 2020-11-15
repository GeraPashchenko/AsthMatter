import styled from "styled-components";

export const FormHeader = styled.h1`
 font-weight: 100;
`;

export const FormFooter = styled.h3`
 font-weight: 500;
 color: #2B4874;
`;

export const FormButton = styled.button`
  background-color: #96A8D6;
  border-radius: 20px;
  border: 0px solid;
  padding: 10px;
  font-size: 20px;
  width: 200px;
  cursor: pointer;
  // color: #FFFFFF;
`;

export const Form = styled.form`
  position: fixed;
  left: 32%;
  top: 100px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 630px;
  background-color: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 22px;
`;

export const FormFieldDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 400px;
  margin: 10px;
`;

export const LabelDivForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 130px;
`;

export const LabelField = styled.span`
  width: 300px;
  font-size: 20px;
`;

export const LabelRequiredStar = styled.span`
  font-size: 20px;
  color: red;
`;

export const InputForm = styled.input`
  width: 260px;
  height: 20px;
  background-color: white;
  border: 1px solid black;
  margin-left: 15px;
`;

export const List = styled.select`
  width: 260px;
  background-color: white;
  margin-left: 15px;
`;