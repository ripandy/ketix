/**
	Define the bullet class. The bullets will hit enemy and destroy them!
*/
function createBullets(x,y) {
	createjs.Container.call(this);

	// define attributes
	this.x = x;
	this.y = y;

	var elapsedTime = 0;

	var tPos = new createjs.Point(0,0);
	var speed = 10;

	// hitbox
	this.hits = new createjs.Shape();

	this.setTargetPos = function(x,y) {
		tPos.x = x;
		tPos.y = y;
	}

	this.updateSet = function(interval) {
		elapsedTime += interval;
	}
}
createBullets.prototype = new createjs.Container;
