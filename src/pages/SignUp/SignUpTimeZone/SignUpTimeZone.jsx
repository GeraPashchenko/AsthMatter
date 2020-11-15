import React from "react";
import {TimezoneSelect} from './StyledComponents';
import TimeZonesArr from "./TimeZonesArr";

function SignUpTimeZone(){
  return(
    <TimezoneSelect name={'timeZone'}>
      {TimeZonesArr.map(timezone =>{
       return (<option>{timezone.label} {timezone.name}  (GMT{timezone.offset})</option>)
    })}
    </TimezoneSelect>
  )
}

export default SignUpTimeZone;