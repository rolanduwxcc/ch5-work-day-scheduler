//-----------------------------------------------------------------------VARIABLES
var currentDateTime = moment().format('dddd, MMM Do YYYY');
var currentDayEl = document.querySelector("#currentDay");

console.log(currentDayEl);
console.log(currentDateTime);
//-----------------------------------------------------------------------FUNCTIONS
var loadToday = function() {
    currentDayEl.textContent = currentDateTime;
}
//-----------------------------------------------------------------------CALLS
loadToday();
