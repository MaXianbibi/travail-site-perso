let Wday = [
	"Dim",
	"Lun",
	"Mar",
	"Mer",
	"Jeu",
	"Ven",
	"Sam"
]

function CalculateTime() {
	setInterval(function() {
	let date = new Date();
	let day = date.getDay();
	let hour = date.getHours();
	let minute = date.getMinutes();
	let mili = date.getSeconds();
	let ampm = hour <= 12 ? "AM" : "PM";

	document.getElementById("day").innerHTML = Wday[day];
	document.getElementById("hour").innerHTML = hour;
	document.getElementById("minute").innerHTML = minute;
	document.getElementById("timeofday").innerHTML = ampm;
	document.getElementById("mili").innerHTML = mili;
}, 1000); // chaque seconde
}
CalculateTime();