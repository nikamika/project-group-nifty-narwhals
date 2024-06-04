export const formatData = (str) => {
  var newstr = new Date(str);//Get the system time 
  var h = newstr.getHours();
  var min = newstr.getMinutes();
  var s = newstr.getSeconds();
  return ` ${h}:${min}:${s}`; //Display time format
};
