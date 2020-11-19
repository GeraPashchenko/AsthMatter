import styled from "styled-components";

export const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const Block = styled.a`
    min-width: 300px;
    line-height: 100px;
    font-family: 'Roboto', sans-serif;
    text-decoration: none;
    text-align: center;
    font-size: 40px;
    vertical-align: center;
    background-color: #F2F2F2;
    color: black;
    border-radius: 1px;
    box-shadow: 0px 0px 0px 4px rgba(0,0,0,0.2);
    margin: 20px;
    padding: 10px;
`;