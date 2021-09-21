 const inputDate=document.querySelector('#date-input');
 const checkButton=document.querySelector('#check-btn');
 const outputMessage=document.querySelector('#output-msg');

function reverseString(str) {
    var listOfChars=str.split('');
    var reverseListOfChars=listOfChars.reverse();
    var reverseStr=reverseListOfChars.join('');
    return reverseStr;
}
function ispalindrome(str) {
var reverse=reverseString(str);
if(str===reverse){
return true;
}
else {
    return false;
}

}

function dateIntoString(date) {
var dateStr={day:'',month:'',year:''};
if(date.day<10){
    dateStr.day='0'+date.day;
}
else {
    dateStr.day=date.day.toString();
}
if(date.month<10){
    dateStr.month='0'+date.month;
}
else {
    dateStr.month=date.month.toString();
}
dateStr.year=date.year.toString();
return dateStr;
}

function dateFormats(date) {

var dateStr=dateIntoString(date);
var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

function checkPalindrome(date) {
var listOfPalindrome=dateFormats(date);
var palindrome=false;
for(var i=0;i<listOfPalindrome.length;i++) {
    if(ispalindrome(listOfPalindrome[i])){
        palindrome=true;
        break;
    }
}
return palindrome;
}
function isLeapYear(year) {
if(year%400===0){
    return true;
}
if(year%100===0){
    return false;
}
if(year%4===0){
    return true;
}

return false;

}


function getNextDate(date) {
var day=date.day+1;
var month=date.month;
var year=date.year;

var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

if(month===2){  
    if(isLeapYear(year)){
if(day>29){
    day=1;
    month++;
}
}
else{
    if(day>28){
        day=1;
        month++;
    }
}

    
}
    else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }

if(month>12){
    month=1;
    year++;
}

return {
    day:day ,
    month:month ,
    year:year
};

}
function nextPalindromeDate(date){
    var nxt=0;
    var nextDate=getNextDate(date);
    while(1){
        nxt++;
        var ispalindrome=checkPalindrome(nextDate);
        if(ispalindrome){
            break;
        }
        nextDate=getNextDate(nextDate);
    }
    return [ nxt , nextDate];
}

var date={
    day:1 ,
        month:1 ,
        year:2021
}
function getPreviousDate(date) {

    

    var day=date.day-1;
    var month=date.month;
    var year=date.year;
    
    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    
    if(month===3){  
        if(isLeapYear(year)){
    if(day<1){
        day=29;
        month--;
        
    }
    }
    else{
        if(day<29){
             day=28;
            
        }
    }
    
        
    }
        else{
            if(day<1){
                day=daysInMonth[month-1];
                month--;
            }
        }
    
    if(month<1){
        month=12;
        year--;
    }
    
    return {
        day:day ,
        month:month ,
        year:year
    };
}
function previousPalindromeDate(date){
    var pre=0;
    var previousDate=getPreviousDate(date);
    while(1){
        pre++;
        var ispalindrome=checkPalindrome(previousDate);
        if(ispalindrome){
            break;
        }
        previousDate=getPreviousDate(previousDate);
    }
    return [ pre , previousDate];
}

//console.log(getPreviousDate(date))



checkButton.addEventListener('click', function eventHandler(){

    var bdayStr= inputDate.value;
    if(bdayStr!=''){
        var listOfDate=bdayStr.split('-');
        var date ={
            day:Number(listOfDate[2]),
            month:Number(listOfDate[1]),
            year:Number(listOfDate[0])
        }; 
       var ispalindrome=checkPalindrome(date);
       if(ispalindrome){
           outputMessage.innerText = "Yay!! Your Birthday is a Palindrome.."
       }
       else
       {
           if(nxt<pre){
   var[ nxt , nextDate]= nextPalindromeDate(date);
   console.log()
   outputMessage.innerText=`The next Palindrome Date is ${nextDate.day}-${nextDate.month}-${nextDate.year},You missed the Date by ${nxt} days.`;
} else {
    var[ pre , nextDate]= previousPalindromeDate(date);
    console.log()
    outputMessage.innerText=`The Last Palindrome Date was ${nextDate.day}-${nextDate.month}-${nextDate.year},You missed the Date by ${pre} days.`;

}
       }
       
    }

});