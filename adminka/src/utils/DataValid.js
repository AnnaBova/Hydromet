/* eslint-disable */

export function DataValid(datestr){
    var arr = datestr.split('.');
    if(arr.length != 2) {
      return false
    }
    if(isNaN(Number(arr[0])) == true || isNaN(Number(arr[1])) == true){
      return false;
    }
    if(Number(arr[0]) < 1 || Number(arr[0])>31){
      return false;
    }
    if(Number(arr[1])<1 || Number(arr[1])>12){
      return false
    }
    return true;
}

export function DayValid(string){
    if(isNaN(Number(string)) == true){
        return false;
    }
    if(Number(string)< 1 || Number(string)>31){
        return false;
    }
    return true;
}

export function YearsValid(string){
    if(isNaN(Number(string)) == true){
        return false;
    }
    if(Number(string)< 0 || Number(string)>new Date().getFullYear()){
        return false;
    }
    return true;
}

export function FullDataValid(datestr){
    var arr = datestr.split('.');
    if(arr.length != 3){
        return false;
    }
    if(isNaN(Number(arr[0])) == true || isNaN(Number(arr[1])) == true || isNaN(Number(arr[2])) == true){
        return false;
    }
    if(Number(arr[0]) < 1 || Number(arr[0])>31){
        return false;
    }
    if(Number(arr[1])<1 || Number(arr[1])>12){
        return false
    }
    if(Number(arr[2])<1 || Number(arr[2])> new Date().getFullYear()){
        return false
    }
    return true;
}