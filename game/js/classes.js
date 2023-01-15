
class Fighter {
	constructor({ position, velocity, keys, color, offset }) {
		this.life = 435;
		this.position = position;
		this.velocity = velocity;
		this.width = 50
		this.keys = keys;
		this.attackBox = {
			position: {
				x: this.position.x,
				y: this.position.y
			},
			offset,
			width: 100,
			height: 50
		};
		this.height = 150;
		this.color = color
		this.isAttacking = false;
	};
	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.width, this.height = 150)
		if (this.isAttacking) {
			c.fillStyle = 'red';
			c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
		}
	}
	update() {
		this.draw();
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
		this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		if (this.position.y + this.height + this.velocity.y > canvas.height - 97)
			this.velocity.y = 0;
		else
			this.velocity.y += gravity
		if (this.life <= 0)
			determineWinner();
	}
	move() {
		if (this.keys.keyLeft.pressed && this.keys.lastKey == this.keys.keyLeft.name)
			this.velocity.x = -5;
		else if (this.keys.keyRight.pressed && this.keys.lastKey == this.keys.keyRight.name)
			this.velocity.x = 5;
	}
	attack() {
		this.isAttacking = true;
		setTimeout(() => {
			this.isAttacking = false;
		}, 100)
	}
};

class Sprite {
	constructor({ position,  imageSrc, scale = 1, frameMax = 1}) {
		this.image = new Image();
		this.position = position;
		this.image.src = imageSrc;
		this.scale = scale;
		this.frameMax = frameMax;
		this.frameCurrent = 0;
	};
	draw() {
		c.drawImage(
					this.image,
					this.frameCurrent * (this.image.width / this.frameMax),
					0,
					this.image.width / this.frameMax,
					this.image.height,
					this.position.x,
					this.position.y,
					(this.image.width / this.frameMax) * this.scale,
					this.image.height * this.scale
					)
	}

	update() {
		this.draw();
	}
};

class Animation extends Sprite {
	constructor ({ position,  imageSrc, scale = 1, frameMax = 1})
	{
		super({ position,  imageSrc, scale, frameMax});
	}

	// update() {
	// 	console.log('hello');

	// }




}