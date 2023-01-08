function changeColors() {



	const randomHex = Math.floor(Math.random() * 16777215).toString(16);
	document.body.style.background = "#" + randomHex;
	let text_html = document.getElementById("hex-code");

	text_html.innerHTML = randomHex;

}



function changeColor() {
	var textElement = document.getElementById("title");
	
	setInterval(function() {
		const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16);
		textElement.style.color = randomHex;
	
	}, 500); // chaque seconde
  }
  
  changeColor();