var ok = [
	0,
	0
];

var i = 0;
var signe = '';

var res = document.getElementById("resultat");


function addi(n, lol) {
	let tmp = lol;

	tmp = tmp * 10 + n;
	res.innerHTML = tmp;
	return tmp
}


function reset() {
			i = 0;
			signe = '';
			ok[0] = 0;
			ok[1] = 0;
			console.log(ok)
}

function number (n) {
	if (typeof n == 'number' || n == '.')
	{
		ok[i] = addi(n, ok[i]);
		res.innerHTML = ok[i];
	}
	else {
		if (n == 'C')
			reset()
		else if (ok[1])
		{
			if (signe == '+')
				ok[0] += ok[1];
			else if (signe == '-')
				ok[0] -= ok[1];
			else if (signe == '/')
				ok[0] /= ok[1];
			else if (signe == '*')
				ok[0] *= ok[1];
			else
				reset();
			i = 0;
			ok[1] = 0;
			signe = n;
		}
		else
		{
			signe = n;
			i = 1;
		}
	}
	res.innerHTML = ok[i];
}