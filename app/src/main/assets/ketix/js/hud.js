function createHUD(x,y) {
	createjs.Container.call(this);

	// define attributes
	this.x = x;
	this.y = y;
	
	// button pause
	var w = 60;
	var h = 60;
	this.pauseBtn = new createjs.Shape();
	this.pauseBtn.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(-w/2,-h/2,w,h);
	this.pauseBtn.graphics.beginFill("rgba(255,255,255,0.6)").drawRect(-10,-10,8,20).drawRect(2,-10,8,20);
	this.pauseBtn.cursor = "pointer";
	this.addChild(this.pauseBtn);
	this.pauseBtn.x = w/2;
	this.pauseBtn.y = h/2;

	// pause set
	var pCtr = new createjs.Container();

	var overlay = new createjs.Shape();
		overlay.graphics.beginFill("#363636").drawRect(-(CANVAS_WIDTH - 160)/2, -400, CANVAS_WIDTH - 160, 800);
		overlay.alpha = 0.6;
	pCtr.addChild(overlay);

	var pLabel = new createjs.Text("Game Paused", "40pt sans-serif", "#ffffff");
		pLabel.textAlign = "center";
		pLabel.textBaseline = "middle";
		pLabel.y = -240;
	pCtr.addChild(pLabel);

	this.rHit = new createjs.Shape();
	this.rHit.graphics.beginFill("#363636").drawRect(-200,-40,400,80);
	this.rHit.y = -80;
	this.rHit.cursor = "pointer";
	this.rHit.alpha = 0.01;
	pCtr.addChild(this.rHit);

	this.mHit = new createjs.Shape();
	this.mHit.graphics.beginFill("#363636").drawRect(-200,-40,400,80);
	this.mHit.y = this.rHit.y + 80;;
	this.mHit.cursor = "pointer";
	this.mHit.alpha = 0.01;
	pCtr.addChild(this.mHit);

	var resumeLabel = new createjs.Text("Resume", "28pt sans-serif", "#ffffff");
		resumeLabel.textAlign = "center";
		resumeLabel.textBaseline = "middle";
		resumeLabel.y = this.rHit.y;
	pCtr.addChild(resumeLabel);

	var menuLabel = new createjs.Text("Main Menu", "28pt sans-serif", "#ffffff");
		menuLabel.textAlign = "center";
		menuLabel.textBaseline = "middle";
		menuLabel.y = this.mHit.y;
	pCtr.addChild(menuLabel);

	pCtr.x = CANVAS_WIDTH/2;
	pCtr.y = CANVAS_HEIGHT/2;
	pCtr.visible = false;

	this.addChild(pCtr);

	this.setPaused = function(pause) {
		pCtr.visible = pause;
	}
}
createHUD.prototype = new createjs.Container;
