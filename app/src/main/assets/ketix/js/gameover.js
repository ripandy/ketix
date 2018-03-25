function createGameOver(x,y) {
	createjs.Container.call(this);

	// define attributes
	this.x = x;
	this.y = y;

	var overlay = new createjs.Shape();
		overlay.graphics.beginFill("#363636").drawRect(-(CANVAS_WIDTH - 160)/2, -(CANVAS_HEIGHT-160)/2, CANVAS_WIDTH - 160, CANVAS_HEIGHT - 160);
		overlay.alpha = 0.6;
		overlay.x = CANVAS_WIDTH/2;
		overlay.y = CANVAS_HEIGHT/2;
	this.addChild(overlay);
	
	// gameover label
	var kLabel = new createjs.Text("Game\nOver", "120pt sans-serif", "#ffffff");
		kLabel.textAlign = "center";
		kLabel.textBaseline = "middle";
		kLabel.x = CANVAS_WIDTH/2;
		kLabel.y = CANVAS_HEIGHT/6;
	this.addChild(kLabel);

	// score label
	var sLabel = new createjs.Text ("Score", "32pt sans-serif", "#ffffff");
		sLabel.textAlign = "center";
		sLabel.textBaseline = "middle";
		sLabel.x = CANVAS_WIDTH/2;
		sLabel.y = CANVAS_HEIGHT/2 - 80;
	this.addChild(sLabel);

	var svLabel = new createjs.Text ("0", "32pt sans-serif", "#ffffff");
		svLabel.textAlign = "center";
		svLabel.textBaseline = "middle";
		svLabel.x = sLabel.x;
		svLabel.y = sLabel.y + 60;
	this.addChild(svLabel);

	// main menu button
	this.hit = new createjs.Shape();
	this.hit.graphics.beginFill("#363636").drawRect(-200,-40,400,80);
	this.hit.x = CANVAS_WIDTH/2;
	this.hit.y = CANVAS_HEIGHT/2 + 160;
	this.hit.cursor = "pointer";
	this.hit.alpha = 0.01;
	this.addChild(this.hit);

	var menuLabel = new createjs.Text("Main Menu", "40pt sans-serif", "#ffffff");
		menuLabel.textAlign = "center";
		menuLabel.textBaseline = "middle";
		menuLabel.x = this.hit.x;
		menuLabel.y = this.hit.y;
	this.addChild(menuLabel);

	this.setScore = function(score) {
		svLabel.text = "" + score;
	}
}
createGameOver.prototype = new createjs.Container;
