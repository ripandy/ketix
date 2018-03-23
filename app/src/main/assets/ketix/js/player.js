/**
	Define the player class. The player classes can shoot bullets!
*/
function createPlayer(x,y) {
	createjs.Container.call(this);

	// define attributes
	this.x = x;
	this.y = y;
	// var elapsedTime = 0;
	// var targetWord = "";
	this.target = -1;

	// hitbox
	this.hits = new createjs.Shape();

	/**
		Use this to attack enemy.
		@params: ch = character pressed.
	*/
	// this.attack = function(ch) {
	// }

	// this.updateSet = function(interval) {
	// 	elapsedTime += interval;
	// }
}
createPlayer.prototype = new createjs.Container;
