import styled from "styled-components";

export const AttacksPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  min-width: 100%;
  min-height: 100%;
  position: relative;
`;

export const ChoosePeriodDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between; 
`;

export const ChoosePeriodList = styled.select`
  width: 210px;
  height: 29px;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;  
`;

export const PageHeader = styled.h1`
  font-size: 50px;
  font-weight: 500;
  align-items: center;
`;

export const Table = styled.table`
  width: 100%;
  padding: 10px;
  margin: 10px;
  font-size: 20px;
  border: 1px dotted black;
`;

export const TableRow = styled.tr`
  margin: 5px;
`;

export const TableD = styled.td`
  padding: 10px;
`;

export const DeleteBttn = styled.button`
  
`;

export const UpdateBttn = styled.button`
  
`;