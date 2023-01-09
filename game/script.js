const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let timer = 10;
let timerId;

const enemyLifeBar = document.querySelector('#enemyHealth').style;
const playerLifeBar = document.querySelector('#playerHealth').style;
const clock = document.getElementsByClassName('timer')[0];
const result = document.getElementsByClassName('result')[0];

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
	position: {
		x: 0,
		y: 0
	},
	imageSrc: 'img/background.png'
});

const player = new Fighter({
	position: {
		x: 0,
		y: 0
	},
	velocity: {
		x: 0,
		y: 0
	},
	keys: {
		keyLeft: {
			pressed: false,
			name: 'a'
		},
		keyRight: {
			pressed: false,
			name: 'd'
		},
		keyUp: {
			pressed: false,
			name: 'w'
		},
		keyAttack: {
			pressed: false,
			name: ' '
		},
		lastKey: ''
	},
	color: 'green',
	offset: {
		x: 0,
		y: 0,
	},
});

const enemy = new Fighter({
	position: {
		x: 400,
		y: 100
	},
	velocity: {
		x: 0,
		y: 0
	},
	keys: {
		keyLeft: {
			pressed: false,
			name: 'ArrowLeft'
		},
		keyRight: {
			pressed: false,
			name: 'ArrowRight'
		},
		keyUp: {
			pressed: false,
			name: 'ArrowUp'
		},
		keyAttack: {
			pressed: false,
			name: 'Enter'
		},
		lastKey: ''
	},
	color: 'blue',
	offset: {
		x: -50,
		y: 0,
	}
});

function determineWinner() {
	clearTimeout(timerId);
	if (player.life == enemy.life)
		result.innerHTML = "TIE"
	if (player.life > enemy.life)
		result.innerHTML = "VICTORY FOR NUMVER 1"
	if (player.life < enemy.life)
		result.innerHTML = "VICTORY FOR NUMVER 2"
	result.style.opacity = '1';
}


function decreaseTimer() {
	if (timer >= 0 && player.life > 0 && enemy.life > 0) {
		timerId = setTimeout(decreaseTimer, 1000);
		clock.innerHTML = timer--;
	}
	else
		determineWinner();
}

decreaseTimer();

function rectangleCollision(player, enemy) {
	return (
		player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
		player.attackBox.position.x <= enemy.position.x + enemy.width &&
		player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
		player.attackBox.position.y <= enemy.position.y + enemy.height &&
		player.isAttacking
	)
}

function update_stats(Fighter) {
	Fighter.update();
	Fighter.velocity.x = 0;
	Fighter.move();
}

function animate() {
	window.requestAnimationFrame(animate);
	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height);
	background.update();
	update_stats(player);
	update_stats(enemy);

	if (rectangleCollision(player, enemy)) {
		player.isAttacking = false;
		enemy.life -= 29;
		enemyLifeBar.width = enemy.life + "px";
	}
	if (rectangleCollision(enemy, player)) {
		enemy.isAttacking = false;
		player.life -= 29;
		playerLifeBar.left = 435 * ((435 - player.life) / 435) + "px";
	}
}

animate();
function key_down(Fighter, key) {
	switch (key) {
		case Fighter.keys.keyRight.name:
			Fighter.keys.keyRight.pressed = true;
			Fighter.keys.lastKey = Fighter.keys.keyRight.name;
			break;
		case Fighter.keys.keyLeft.name:
			Fighter.keys.keyLeft.pressed = true;
			Fighter.keys.lastKey = Fighter.keys.keyLeft.name;
			break;
		case Fighter.keys.keyUp.name:
			Fighter.velocity.y -= 20;
			break;
		case Fighter.keys.keyAttack.name:
			Fighter.attack();
			break;
	}
}
function key_up(Fighter, key) {
	switch (key) {
		case Fighter.keys.keyRight.name:
			Fighter.keys.keyRight.pressed = false;
			break;
		case Fighter.keys.keyLeft.name:
			Fighter.keys.keyLeft.pressed = false;
			break;
	}
}
window.addEventListener('keydown', (event) => {
	key_down(player, event.key);
	key_down(enemy, event.key);
});
window.addEventListener('keyup', (event) => {
	key_up(player, event.key);
	key_up(enemy, event.key);
});