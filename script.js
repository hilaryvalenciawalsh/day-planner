// CREATES OUR LOCAL STORAGE
function retrievingLocalStorage(key) {
  let thisValue = localStorage.getItem(key);
  if (thisValue) {
    $(`#text${key}`).text(thisValue);
  }}
// THIS FUNCTION CREATES ROW/COLUMN/AND APPENDS ROWS
$(document).ready(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (let i = 9; i < 18; i++) {
    var row = $(`<div data-time=${i} id='${i}' class="row">`);
    var columnOne = $(
      '<div class="col-sm-3"> <p class="hour">' + dayOrNight(i) + "</p>");
    var columnTwo = $(
      `<div class="col-sm-6 past"><textarea id=text${i} class="description" placeholder="What are you needing to complete this hour?"></textarea>`);
    var columnThree = $(
      `<div class="col-sm-3"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`);
    row.append(columnOne);
    row.append(columnTwo);
    row.append(columnThree);
    $(".container").append(row);

// CALLING FUNCTION
retrievingLocalStorage(i); }

function dayOrNight(hours) {
    var dayEvening = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + dayEvening; }

// CALLING FUNCTION
dayOrNight();

// CREATE NEW FUNCTION THAT CHANGES COLORS
function differentColors() {
    var actualTimeNow = new Date().getHours();
    for (var i = 9; i < 18; i++) {
    console.log(actualTimeNow, $(`#${i}`).data("time"));
    if ($(`#${i}`).data("time") == actualTimeNow) {
    $(`#text${i}`).addClass("present");
    } else if (actualTimeNow < $(`#${i}`).data("time")) {
    $(`#text${i}`).addClass("future");
}}}

// CALLS FUNCTIONS
setInterval(function () {
differentColors();}, 1000);

// PULLS FROM LOCAL STORAGE TO SAVE DATA WHEN PRESSING THE SAVE BUTTON KEY
var theSaveButton = $(".saveBtn");
  theSaveButton.on("click", function () {
    let eventId = $(this).attr("id");
    let eventText = $(this).parent().siblings().children(".description").val();
    localStorage.setItem(eventId, eventText);
  });});
