var KEYBOARD_KEYS = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];

function createKeyboardSet(x,y) {
	createjs.Container.call(this);
	this.x = x;
	this.y = y;

	var w = Math.round(CANVAS_WIDTH/10);
	var h = w * 2;

	var keyBG = new createjs.Shape();
		keyBG.graphics.beginFill("#330066").drawRect(0,0,CANVAS_WIDTH,-h*3);
		keyBG.alpha = 0.6;
	this.addChild(keyBG);

	var keyboard = [];
	this.hits = [];
	for (var i = 0; i < 26; i++) {
		var dx = 0;
		var dy = h * 2;

		var kb = new createjs.Text(KEYBOARD_KEYS[i], "36pt sans-serif", "#ffffff");
			kb.textAlign = "center";
			kb.textBaseline = "middle";
		
		if (i >= 19) {
			dx = w * 1.5;
			dy = 0;
		} else if (i >= 10) {
			dx = w/2;
			dy = h;
		}

		if (i == 0 || i == 10 || i == 19) {
			kb.x = w/2 + dx;
		} else {
			kb.x = keyboard[i-1].x + w;
		}
		kb.y = -h/2 - dy;

		this.addChild(kb);
		keyboard.push(kb);

		var hit = new createjs.Shape();
			hit.graphics.beginFill("#330066").drawRect(-w/2,-h/2,w,h);
			hit.alpha = 0.01;
			hit.cursor = "pointer";
			hit.x = kb.x;
			hit.y = kb.y;
		this.addChild(hit);
		this.hits.push(hit);
	}

	// TODO: HOVERING BOX
	
	this.mousedown = function(i) {
	// 	keyboard[i].sourceRect = {x:w*2,y:0,width:w,height:h};
	}

	this.pressup = function(i) {
	// 	keyboard[i].sourceRect = {x:0,y:0,width:w,height:h};
	}
}
createKeyboardSet.prototype = new createjs.Container;
