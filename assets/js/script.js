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
      var newDivEl = document.createElement("div");
      newDivEl.setAttribute("class","row gy=5 hour-slot");

      var newSpanEl = document.createElement("span");
      newSpanEl.setAttribute("class","col-md-2 hour");
      newSpanEl.textContent = moment(i+startTime+"00","Hmm").format("hh a");
      newDivEl.appendChild(newSpanEl);

      var newApptEl = document.createElement("p");
      newApptEl.setAttribute("class","col-md-8 description");
      newApptEl.setAttribute("id",i);
      newApptEl.textContent = schedule[i];
      newDivEl.appendChild(newApptEl);

      var newBtnEl = document.createElement("button");
      newBtnEl.setAttribute("type","button");
      newBtnEl.setAttribute("class","col-md-2 btn saveBtn");
      newBtnEl.textContent ="Save";
      newDivEl.appendChild(newBtnEl);

      auditTask(newDivEl);

      theScheduleEl.appendChild(newDivEl);
    } 
  };
  
  var saveSlots = function() {
      localStorage.setItem("schedule", JSON.stringify(schedule));
      location.reload();
  };

  var auditTask = function(slotEl) {
    //get slot time from element convert to 24hr time
    var slotHour = $(slotEl).find("span").text().trim();
    slotHour = moment(slotHour,"hh a").format("H");
      
    //create a today date time object based on slot time
    var slotDateTime = moment().set("hour",slotHour);
    
    //remove any old classes from element
    $(slotEl).removeClass("past present future");
  
    
    //apply new class if task if current time is after/before/equal to slot's time
    if (moment().isAfter(slotDateTime)) {
      $(slotEl).addClass("past");
    }
    else if (moment().isBefore(slotDateTime)) {
      $(slotEl).addClass("future");
    }
    else {
      $(slotEl).addClass("present");
    }
  };

//-----------------------------------------------------------------------EVENTS
//---------------------------------Click Slot Event
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
//---------------------------------Click Save Button Event
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
