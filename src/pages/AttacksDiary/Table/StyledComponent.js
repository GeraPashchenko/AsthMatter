import styled from "styled-components";

export const AttacksTable = styled.table`
  margin: 20px;
  width: 700px;
  background-color: #E8E8E8;
  border-left: 1px solid #A7A7A7;
  border-top: 1px solid #A7A7A7;
  border-right: 1px solid #A7A7A7;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  text-align: center;
  font-size: 25px;
  font-weight: 200;
  padding: 5px;
  border-right: 1px solid #A7A7A7;
  border-bottom: 1px solid #A7A7A7;
`;

export const TD = styled.td`
  font-size: 25px;
  border-right: 1px solid #A7A7A7;
  border-bottom: 1px solid #A7A7A7;
  padding: 10px;
`;

export const TableBttn = styled.input`
  background: #96A8D6;
  font-size: 20px;
  padding: 5px;
  margin-left: 10px;
  border: solid 1px transparent;
  border-radius: 10px;
  color: white;
  outline: none;
  cursor: pointer;
`;