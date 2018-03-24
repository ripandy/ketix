/**
	Define the bullet class. The bullets will hit enemy and destroy them!
*/
function createBullet(x,y) {
	createjs.Container.call(this);

	// define attributes
	this.x = x;
	this.y = y;

	this.target = -1;

	var speed = 800;
	var rt = 0;

	// hitbox
	var r = 6;
	this.hits = new createjs.Shape();
	this.hits.graphics.beginFill("#acacac").drawCircle(0,0,r);
	this.hits.graphics.moveTo(-r,0).lineTo(r,0).lineTo(r/2,r*2).lineTo(0,r*8).lineTo(-r/2,r*2).lineTo(-r,0);
	this.addChild(this.hits);

	this.shoot = function(target,startx,starty,tgtx,tgty) {
		this.target = target;
		this.x = startx;
		this.y = starty;
		var dx = this.x - tgtx;
		var dy = this.y - tgty;
		rt = Math.atan(dy/dx);
		var rot = toDegrees(rt);
		this.rotation = rot + (rot < 0 ? 90 : -90);
		this.visible = true;
	}

	this.collided = function() {
		this.target = -1;
		this.visible = false;
	}

	this.updateSet = function(interval) {
		var dx = speed * Math.cos(rt) * interval;
		var dy = speed * Math.sin(rt) * interval;
		if (rt > 0) {
			dx *= -1;
			dy *= -1;
		}
		this.x += dx;
		this.y += dy;
	}
}
createBullet.prototype = new createjs.Container;
