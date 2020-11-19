import React from "react";
import {TimezoneSelect} from './StyledComponents';
import TimeZonesArr from "./TimeZonesArr";

function SignUpTimeZone(props){
  const selectedTimeZone = props.selectedTimeZone;
  return(
    <TimezoneSelect name={'timeZone'}>
      {TimeZonesArr.map(timezone =>{
        if(selectedTimeZone === timezone.name){
          return (<option selected key={timezone.name}>{timezone.name}  (GMT {timezone.offset})</option>)
        } else{
          return (<option key={timezone.name}>{timezone.name}  (GMT {timezone.offset})</option>)
        }
    })}
    </TimezoneSelect>
  )
}

export default SignUpTimeZone;