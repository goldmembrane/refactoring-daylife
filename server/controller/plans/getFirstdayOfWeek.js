/**
 * 날짜를 입력받으면 그 날짜가 포함된 주의 첫째 날짜와 마지막 날짜가 반환
 * input: new Date()
 * output ['시작년월일','끝년월일']
 */

module.exports = (now) => {
  var value = [];
  var formatDate = function(date){
    var myMonth = date.getMonth()+1; 
    var myWeekDay = date.getDate();
       
    var addZero = function(num){
      if (num < 10){
        num = "0"+num;
      }
      return num;
    }
    var md = addZero(myMonth)+addZero(myWeekDay);
    return md;
  }
  var nowDayOfWeek = now.getDay(); 
  var nowDay = now.getDate(); 
  var nowMonth = now.getMonth(); 
  var nowYear = now.getYear(); 

  nowYear += (nowYear < 2000) ? 1900 : 0; 

  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); 
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
  
  value.push(nowYear+formatDate(weekStartDate));
  value.push(nowYear+formatDate(weekEndDate));
         
  return value;
}