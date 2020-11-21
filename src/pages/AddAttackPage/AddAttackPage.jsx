import React from "react";
import AddAttackForm from "./AddAttackRecordForm/AddAttackForm";
import PatientSideMenu from "../../menus/PatientSideMenu";

export default function AddAttackPage (props) {
  const {language} = props;


  return (
    <>
    <PatientSideMenu language={language}/>
    <AddAttackForm/>
    </>
  )
}