/**
	Define the player class. The player classes can shoot bullets!
*/
function createPlayer(x,y) {
	createjs.Container.call(this);

	// define attributes
	this.x = x;
	this.y = y;

	var elapsedTime = 0;
	this.target = -1;

	var curRot = 0;
	var tgtRot = 0;

	// hitbox
	this.hits = new createjs.Shape();
	this.hits.graphics.setStrokeStyle("2").beginStroke("#ffffff").beginFill("#8642CE").drawCircle(0,0,30);
	this.hits.graphics.moveTo(0,0).lineTo(0,-30);
	this.hits.alpha = 0.2;
	this.addChild(this.hits);

	var body = new createjs.Bitmap(images.bebek);
		body.regX = body.getBounds().width/2;
		body.regY = body.getBounds().height/2;
	this.addChild(body);

	/**
		Use this to attack enemy.
	*/
	this.attack = function(tgtx, tgty) {
		var dx = this.x - tgtx;
		var dy = this.y - tgty;
		var atan = Math.atan(dy/dx);
		var rot = toDegrees(atan);
		tgtRot = rot + (rot < 0 ? 90 : -90);
		curRot = this.rotation;
		elapsedTime = 0;
		// console.log(atan + ", " + rot + ", " + dx + ", " + dy + ", " + this.x + ", " + this.y + ", " + tgtx + ", " + tgty);
	}

	this.updateSet = function(interval) {
		elapsedTime += interval;
		if (elapsedTime <= 0.1) {
			this.rotation = easeInQuad(elapsedTime, curRot, (tgtRot-curRot), 0.1);
		} else {
			this.rotation = tgtRot;
		}
	}
}
createPlayer.prototype = new createjs.Container;
