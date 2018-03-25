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

	this.shot = 0;
	this.damage = 0;
	this.dead = false;

	var recoilDur = 0.3;
	var elapsedTime = 0.3;
	var rt;
	var tPos = new createjs.Point(0,0);

	// hitbox
	var rad = 30 * (type + 1);
	this.hits = new createjs.Shape();
	this.hits.graphics.setStrokeStyle("2").beginStroke("#cc3333").beginFill("#969696").drawCircle(0,0,rad);
	this.hits.graphics.moveTo(0,0).lineTo(0,-rad);
	this.hits.alpha = 0.6;
	this.addChild(this.hits);

	// word label
	var label = new createjs.Text(word, "24pt sans-serif", "#ffffff");
		label.textAlign = "right";
		label.textBaseline = "middle";
		label.alpha = 0.8;
		
	var tw = label.getMeasuredWidth() + 20;
	var th = 40;

	var labelBG = new createjs.Shape();
		labelBG.graphics.beginFill("#333333").drawRect(-tw,-th/2,tw,th);
		labelBG.alpha = 0.6;

		label.x = tw/2-10;
		label.y = rad + th/2;
		labelBG.x = tw/2;
		labelBG.y = label.y;

	this.addChild(labelBG);
	this.addChild(label);

	this.init = function(x,y,type,speed,word) {
		this.x = x;
		this.y = y;

		if (this.type != type) {
			rad = 30 * (type + 1);
			this.hits.graphics.clear().setStrokeStyle("2").beginStroke("#cc3333").beginFill("#969696").drawCircle(0,0,rad);
			this.hits.graphics.moveTo(0,0).lineTo(0,-rad);
		}

		this.type = type;
		this.speed = speed * ((type == ENEMY_TYPE.TIER_1 || type == ENEMY_TYPE.TIER_2) ? 0.5 : 1);
		this.word = word;

		this.shot = 0;
		this.damage = 0;
		this.dead = false;

		this.visible = true;

		label.text = word;
		label.color = "#ffffff";

		tw = label.getMeasuredWidth() + 20;

		labelBG.graphics.clear().beginFill("#666666").drawRect(-tw,-th/2,tw,th);

		label.x = tw/2-10;
		label.y = rad + th/2;
		labelBG.x = tw/2;
		labelBG.y = label.y;
	}

	this.setTargetPos = function(tgtx, tgty) {
		var dx = this.x - tgtx;
		var dy = this.y - tgty;
		rt = Math.atan(dy/dx);
		var rot = toDegrees(rt);
		this.hits.rotation = rot + (rot < 0 ? -90 : 90);
	}

	this.damaged = function() {
		this.damage++;
		var tp = "";
		for (var i = 0; i < this.damage; i++) {
			tp += " ";
		}
		tp += this.word.substring(this.damage);
		label.text = tp;
		label.color = "#ff9a00";

		if (this.damage == this.word.length) {
			this.dead = true;
			label.text = "";
			this.visible = false;
		}
		elapsedTime = 0;

	}

	this.updateSet = function(interval) {
		elapsedTime += interval;
		var dx = this.speed * Math.cos(rt) * interval;
		var dy = this.speed * Math.sin(rt) * interval;
		if (rt < 0) {
			dx *= -1;
			dy *= -1;
		}
		this.x += dx * (elapsedTime < recoilDur ? -0.4 : 1);
		this.y += dy * (elapsedTime < recoilDur ? -0.4 : 1);
	}
}
createEnemy.prototype = new createjs.Container;
