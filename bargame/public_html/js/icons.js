$(document).ready(function(){
	console.log("connected to icons.js");
	var iconBars = document.getElementsByClassName("icon-bar");
	
	var id = setInterval(frame, 5);
	var time = 0;
	var period = [700, 2000, 500];
	function frame(){
		
		for (i = 0; i<iconBars.length; i++) {
			var phase = time/period[i]*2*Math.PI;
			iconBars[i].style.width = (50-15*Math.cos(phase))+"%";
		}

		time++;
	}
});