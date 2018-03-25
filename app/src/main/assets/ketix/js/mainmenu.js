function createMainMenu(x,y) {
	createjs.Container.call(this);

	// define attributes
	this.x = x;
	this.y = y;
	
	// ketix label
	var kLabel = new createjs.Text("KetiX!", "120pt sans-serif", "#ffffff");
		kLabel.textAlign = "center";
		kLabel.textBaseline = "middle";
		kLabel.x = CANVAS_WIDTH/2;
		kLabel.y = CANVAS_HEIGHT/4;
	this.addChild(kLabel);

	this.pHit = new createjs.Shape();
	this.pHit.graphics.beginFill("#363636").drawRect(-200,-40,400,80);
	this.pHit.x = CANVAS_WIDTH/2;
	this.pHit.y = CANVAS_HEIGHT/2;
	this.pHit.cursor = "pointer";
	this.pHit.alpha = 0.01;
	this.addChild(this.pHit);

	var playLabel = new createjs.Text("Play Game", "40pt sans-serif", "#ffffff");
		playLabel.textAlign = "center";
		playLabel.textBaseline = "middle";
		playLabel.x = this.pHit.x;
		playLabel.y = this.pHit.y;
	this.addChild(playLabel);
}
createMainMenu.prototype = new createjs.Container;
