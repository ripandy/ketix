// enumeration for enemy types
ENEMY_TYPE = {
	BASIC:0,
	TIER_1:1,
	TIER_2:2,
	TIER_3:3,
	DEBRIS:4,
}

/**
	Define the enemy class. The enemy will approach player.
*/
function createEnemy(x,y,type,speed,word) {
	createjs.Container.call(this);

	// define attributes
	this.x = x;
	this.y = y;

	this.type = type;
	this.speed = speed * ((type == ENEMY_TYPE.TIER_1 || type == ENEMY_TYPE.TIER_2) ? 0.5 : 1);
	this.word = word;

	this.damage = 0;
	this.dead = false;

	// hitbox
	this.hits = new createjs.Shape();
}
createEnemy.prototype = new createjs.Container;
