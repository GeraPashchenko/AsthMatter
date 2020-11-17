import React, { useState } from "react";
import { SelectDoctorList } from "./StyledComponent";
import localization from '../../../localization/localization.json';

function DoctorSelectElement(props) {
    const { formData, handleChange, language } = props;
    const [data, setData] = useState(formData);

    let selectedDoctor = formData.fullName;
    if (formData.hospital !== null) {
        selectedDoctor += "(" + formData.hospital.city + ")";
    }
    alert(selectedDoctor);
    return (
        <SelectDoctorList name={'id'} defaultValue={selectedDoctor} onChange={handleChange}>
            {
                formData.doctors.map(doctor => {
                    if(doctor.key !== undefined){
                        return (<option data-key={doctor.key} key={doctor.key} value={doctor.value}>{doctor.value}</option>)
                    }
                    else{
                        let doctorFullName = doctor.user.surname + " " + doctor.user.name;
                        if (doctor.user.patronymic !== null) {
                            doctorFullName += " " + doctor.user.patronymic;
                        }
    
                        if (doctor.hospital !== null) {
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