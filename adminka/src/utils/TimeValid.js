/* eslint-disable */

export function HourValid(timestr){
    if(isNaN(Number(timestr)) == true){
      return false;
    }
    if(Number(timestr) < 1 || Number(timestr)>24){
        return false;
    }
    return true;
}