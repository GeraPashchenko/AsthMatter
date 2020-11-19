import React, { useState } from "react";
import { SelectDoctorList } from "./StyledComponent";
import localization from '../../../localization/localization.json';

function DoctorSelectElement(props) {
    const { formData, handleChange, language } = props;
    const [data, setData] = useState(formData);

    let selectedDoctor = formData.fullName;
    if (formData.hospital != null && formData.hospital !== undefined && formData.hospital.title !== undefined) {
        selectedDoctor += "(" + formData.hospital.city + ")";
    }

    for(let i = 0; i < formData.doctors.length; i++){
        if((formData.doctors[i].key !== undefined && formData.patientDoctorId == formData.doctors[i].key) || 
            (formData.doctors[i].user !== undefined && formData.doctors[i].user.id == formData.patientDoctorId)){
            let temp = formData.doctors[0];
            formData.doctors[0] = formData.doctors[i];
            formData.doctors[i] = temp;
            break;
        }
    }

    return (
        <SelectDoctorList name={'id'} onChange={handleChange}>
            {
                formData.doctors.map(doctor => {
                    if(doctor.key !== undefined){
                        return (
                        <option data-key={doctor.key} key={doctor.key} value={localization.doctorPage.notSelectedDoctor[language]}>
                            {localization.doctorPage.notSelectedDoctor[language]}
                            </option>
                            )
                    }
                    else
                    {
                        let doctorFullName = doctor.user.surname + " " + doctor.user.name;
                        if (doctor.user.patronymic != null) {
                            doctorFullName += " " + doctor.user.patronymic;
                        }
    
                        if (doctor.hospital != null) {
                            doctorFullName += " (" + doctor.hospital.city + ")";
                        }
                        return (<option data-key={doctor.user.id} key={doctor.user.id} value={doctorFullName}>{doctorFullName}</option>)
                    }
                })
            }
        </SelectDoctorList>
    )
}

export default DoctorSelectElement;