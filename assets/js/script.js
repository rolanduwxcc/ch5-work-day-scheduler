//-----------------------------------------------------------------------VARIABLES
var startTime = 9;  //adjust the start time here
var hoursPerDay = 9; //adjust hours per day here
var schedule = [];
var currentDateTime = moment().format('dddd, MMM Do YYYY');
var currentDayEl = document.querySelector("#currentDay");
var theScheduleEl = document.getElementById("the-schedule");


//-----------------------------------------------------------------------FUNCTIONS
var loadToday = function() {
    currentDayEl.textContent = currentDateTime;
};

var createSlot = function(slotText, timeSlot) {


    // create elements that make up a task item
    var slotEl = $("<li>").addClass("list-group-item");
    var taskSpan = $("<span>")
      .addClass("badge badge-primary badge-pill")
      .text(taskDate);
    var taskP = $("<p>")
      .addClass("m-1")
      .text(taskText);
  
    // append span and p element to parent li
    taskLi.append(taskSpan, taskP);
  
    //check due date
    auditTask(taskLi);
  
    // append to ul list on the page
    $("#list-" + taskList).append(taskLi);
  };
  
  var loadSlots = function() {
    schedule = JSON.parse(localStorage.getItem("schedule"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!schedule) {
      schedule = [];

    }
  
    for (let i = 0; i < hoursPerDay; i++) {
      const element = i
      var newDivEl = document.createElement("div");
      newDivEl.setAttribute("class","row gy=5");

      var newSpanEl = document.createElement("span");
      newSpanEl.setAttribute("class","col-md-2");
      newSpanEl.textContent = i+startTime+"00";
      newDivEl.appendChild(newSpanEl);

      var newApptEl = document.createElement("p");
      newApptEl.setAttribute("class","col-md-8");
      newApptEl.textContent = schedule[i];
      newDivEl.appendChild(newApptEl);

      var newBtnEl = document.createElement("button");
      newBtnEl.setAttribute("type","button");
      newBtnEl.setAttribute("class","col-md-2");
      newBtnEl.textContent ="Save";
      newDivEl.appendChild(newBtnEl);

      console.log(newDivEl);
      console.dir(newDivEl);
      theScheduleEl.appendChild(newDivEl);
    } 
  };
  
  var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };


  //-----------------------------------------------------task text/p was clicked turned to textarea
$(".list-group").on("click", "p", function() {
  var text = $(this)
    .text()
    .trim();
  
  var textInput = $("<textarea>")
    .addClass("form-contorl")
    .val(text)

    $(this).replaceWith(textInput);

  textInput.trigger("focus");
});

$(".list-group").on("click", ".saveBtn",function() {
    //get teh text area's current value/text
    var text = $("textarea")
    .val()
    .trim();

    var paragraphEl = $("<p>")
    .addClass("col-md-10 description")
    .val(text);

  console.log(paragraphEl);

  $("textarea").replaceWith(paragraphEl);

});


//-----------------------------------------------------------------------CALLS
loadToday();
loadSlots();
