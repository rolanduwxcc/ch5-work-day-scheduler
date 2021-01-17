//-----------------------------------------------------------------------VARIABLES
var startTime = 9;  //adjust the start time here
var hoursPerDay = 9; //adjust hours per day here
var schedule = [];
var theScheduleEl = document.getElementById("the-schedule");


//-----------------------------------------------------------------------FUNCTIONS
var loadToday = function() {
    var currentDateTime = moment().format('dddd, MMM Do YYYY');
    var currentDayEl = document.querySelector("#currentDay");
    currentDayEl.textContent = currentDateTime;
};

var updateSlot = function(index,text) {
  //convert the time into an index value
  // var index = (parseInt(time)/100) - 9; 

  //store updated task info to schedule array
  schedule[index] = text;

  //update the text of the element
  var timeDescriptionEl = document.getElementById(index);
  timeDescriptionEl.textContent = text;

  //check due date
  // auditTask(taskLi);

  saveSlots();
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
      newDivEl.setAttribute("class","row gy=5 hour-slot");

      var newSpanEl = document.createElement("span");
      newSpanEl.setAttribute("class","col-md-2");
      newSpanEl.textContent = i+startTime+"00";
      newDivEl.appendChild(newSpanEl);

      var newApptEl = document.createElement("p");
      newApptEl.setAttribute("class","col-md-8");
      newApptEl.setAttribute("id",i);
      newApptEl.textContent = schedule[i];
      newDivEl.appendChild(newApptEl);

      var newBtnEl = document.createElement("button");
      newBtnEl.setAttribute("type","button");
      newBtnEl.setAttribute("class","col-md-2");
      newBtnEl.textContent ="Save";
      newDivEl.appendChild(newBtnEl);

      theScheduleEl.appendChild(newDivEl);
    } 
  };
  
  var saveSlots = function() {
      localStorage.setItem("schedule", JSON.stringify(schedule));
  };


  //---------------------------------------task text/p was clicked turned to textarea
$("div").on("click", "p", function() {
  var text = $(this)
    .text()
    .trim();
  
  var index = $(this).attr("id");
  
  var textInput = $("<textarea>")
    .addClass("form-contorl")
    .attr("id",index)
    .val(text)

  $(this).replaceWith(textInput);

  console.log(text,index,textInput);
  console.log("Yes");

  textInput.trigger("focus");
});

$("div").on("click", "button",function() {
    //get the text area's current value/text
    var text = $("textarea")
    .val()
    .trim();

    var index = $("textarea").attr("id");

    console.log(text,index);
    console.log("Yes1");

    var paragraphEl = $("<p>")
    .addClass("col-md-8")
    .attr("id",index);
   
    $("textarea").replaceWith(paragraphEl);

    updateSlot(index,text);
});


//-----------------------------------------------------------------------CALLS
loadToday();
loadSlots();
