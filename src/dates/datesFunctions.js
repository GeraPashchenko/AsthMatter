export function formatDate(date) {
    date = new Date(Date.parse(date));
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
  
    return dd + '.' + mm + '.' + yy;
}

export function formatTime(date){
    date = new Date(Date.parse(date));
    var hh = date.getHours();
    if (hh < 10) hh = '0' + hh;
  
    var mm = date.getMinutes();
    if (mm < 10) mm = '0' + mm;
  
    return hh + ':' + mm;
}

export function formatDateTime(date){
    let newDate = formatDate(date);
    let newTime = formatTime(date);
    return newDate + " " + newTime;
}