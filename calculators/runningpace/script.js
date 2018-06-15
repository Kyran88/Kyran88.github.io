"use strict";


function calculatePace(hours, minutes, seconds, distance) {
	var distance = document.getElementById("distance").value;
	var hours = Number(document.getElementById("hours").value);
	var minutes = Number(document.getElementById("minutes").value);
	var seconds = Number(document.getElementById("seconds").value);

	var hourMin = (hours * 60);//convert hour to minutes
  console.log("This should be 60 " + hourMin);
	console.log("This should be 40 " + minutes);
  var minutesPlusHoursSeconds = (hourMin + minutes)*60;
  var secondsTotal = minutesPlusHoursSeconds + seconds;
  var totalTime = (secondsTotal/60)/distance;
  var float = totalTime - Math.floor(totalTime);
  var totalMinutes = Math.floor(totalTime);
  seconds = Math.floor(float*60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  document.getElementById("paceDisplay").innerHTML = "Your pace was " + totalMinutes + ":" + seconds;
}
