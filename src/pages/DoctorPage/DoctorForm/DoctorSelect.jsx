import React, {useState} from "react";
import { SelectDoctorList } from "./StyledComponent";

function DoctorSelectElement(props) {
    const formData = props;
    const [data, setData] = useState(formData);
    let selectedDoctor = data.fullName;
    alert(JSON.stringify(formData));
    if(data.hospital !== undefined){
        selectedDoctor += "(" + data.hospital.city + ")";
    }
    return (
        <SelectDoctorList name={'id'} defaultValue={selectedDoctor}>
            {
                () => {
                    let options = [];
                    for (let doctor in data.doctors) {
                        let doctorFullName = doctor.user.surname + doctor.user.name + doctor.user.patronymic;
                        if (doctor.hospital !== undefined) {
                            doctorFullName += "(" + doctor.hospital.city + ")";
                        }
                        options.push(<option key={doctor.user.id} value={doctor.user.id}>{doctorFullName}</option>);
                    }
                    return options;
                }
            }
        </SelectDoctorList>
    )
}

export default DoctorSelectElement;