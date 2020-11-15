import React from "react";
import {TimezoneSelect} from './StyledComponents';
import TimeZonesArr from "./TimeZonesArr";

function SignUpTimeZone(props){
  const selectedTimeZone = props.selectedTimeZone;
  return(
    <TimezoneSelect name={'timeZone'}>
      {TimeZonesArr.map(timezone =>{
       return (<option selected={selectedTimeZone === timezone.name} name={timezone.name}>{timezone.name}  (GMT {timezone.offset})</option>)
    })}
    </TimezoneSelect>
  )
}

export default SignUpTimeZone;