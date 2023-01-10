
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