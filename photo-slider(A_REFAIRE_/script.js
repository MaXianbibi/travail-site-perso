let i = 0;

function getPicture() {
	return [
		"img/image2.jpg",
		"img/image3.jpg",
		"img/image4.jpg",
		"img/image1.jpg"
	]
}

function test(ok)
{
	const doggo = getPicture();
	i += ok;
	if (i >= doggo.length)
		i = 0;
	else if (i <= 0)
		i = doggo.length - 1;


	document.getElementsByClassName("dogs")[0].style.background = "url('" + doggo[i] + "')";
	document.getElementsByClassName("dogs")[0].style.backgroundSize = "contain";
	document.getElementsByClassName("dogs")[0].style.backgroundRepeat = "no-repeat";
}

// "url('img/image3.jpg')"