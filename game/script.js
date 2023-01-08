const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
constructor({ position, velocity, keys, color }) {
		this.position = position;
		this.velocity = velocity;
		this.width = 50
		this.keys = keys;
		this.attackBox = {
			position: {
				x: this.position.x,
				y: this.position.y
			},
			width: 100,
			height: 50,
		};
		this.height = 150;
		this.color = color
		this.isAttacking = false;
	};
	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.width, this.height = 150)
		

		if (this.isAttacking)
		{
			c.fillStyle = 'red';
			c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
		}
		
	}
	
	update() {
		this.draw();

		this.attackBox.position.x = this.position.x;
		this.attackBox.position.y = this.position.y;
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		
		if (this.position.y + this.height + this.velocity.y > canvas.height)
		this.velocity.y = 0;
		else
		this.velocity.y += gravity
	}
	
	attack() {
		this.isAttacking = true;
		setTimeout(() => {
			this.isAttacking = false;
		}, 100)
	}

};

const player = new Sprite({
	position: {
		x: 0,
		y: 0
	},
	velocity: {
		x: 0,
		y: 0
	},
	keys: {
		a: {
			pressed: false,
		},
		d: {
			pressed: false,
		},
		w: {
			pressed: false,
		},
		lastKey: ''
	},
	color: 'green'
});

const enemy = new Sprite({
	position: {
		x: 400,
		y: 100
	},
	velocity: {
		x: 0,
		y: 0
	},
	keys: {
		ArrowLeft: {
			pressed: false,
		},
		ArrowRight: {
			pressed: false,
		},
		ArrowUp: {
			pressed: false,
		},
		lastKey: ''
	},
	color: 'blue'
});

function animate() {
	window.requestAnimationFrame(animate);
	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height);
	player.update();
	enemy.update();
	player.velocity.x = 0;
	enemy.velocity.x = 0;



	if (player.keys.a.pressed && player.keys.lastKey == 'a')
		player.velocity.x = -5;
	else if (player.keys.d.pressed && player.keys.lastKey == 'd')
		player.velocity.x = 5;



	if (enemy.keys.ArrowLeft.pressed && enemy.keys.lastKey == 'ArrowLeft')
		enemy.velocity.x = -5;
	else if (enemy.keys.ArrowRight.pressed && enemy.keys.lastKey == 'ArrowRight')
		enemy.velocity.x = 5;

	if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
		player.attackBox.position.x <= enemy.position.x + enemy.width &&
		player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
		player.attackBox.position.y <= enemy.position.y + enemy.height &&
		player.isAttacking
		)
		{
			player.isAttacking = false;
			player.color = 'white';
		}
}



animate();

window.addEventListener('keydown', (event) => {
	console.log(event.key);

	switch (event.key) {
		case 'd':
			player.keys.d.pressed = true;
			player.keys.lastKey = 'd'
			break;
		case 'a':
			player.keys.a.pressed = true;
			player.keys.lastKey = 'a'
			break;
		case 'w':
			player.velocity.y -= 20;
			break;
		case ' ':
			player.attack();
			break;


		case 'ArrowRight':
			enemy.keys.ArrowRight.pressed = true;
			enemy.keys.lastKey = 'ArrowRight'
			break;
		case 'ArrowLeft':
			enemy.keys.ArrowLeft.pressed = true;
			enemy.keys.lastKey = 'ArrowLeft'
			break;
		case 'ArrowUp':
			enemy.velocity.y -= 20;
			break;
	}
});

window.addEventListener('keyup', (event) => {
	console.log(event.key);

	switch (event.key) {
		case 'd':
			player.keys.d.pressed = false;
			break;
		case 'a':
			player.keys.a.pressed = false;
			break;


		case 'ArrowRight':
			enemy.keys.ArrowRight.pressed = false;
			break;
		case 'ArrowLeft':
			enemy.keys.ArrowLeft.pressed = false;
			break;
	}
});