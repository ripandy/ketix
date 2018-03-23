var CANVAS_WIDTH = 720;
var CANVAS_HEIGHT = 1280;
var G_CONTEXT;

function ketix(){
	var canvas,stage,images,ctx;
	var canvasWidth = CANVAS_WIDTH;
    var canvasHeight = CANVAS_HEIGHT;
	var xScale=1;
	var yScale=1;
	/*
		kode bahasa
		
		id = indonesia
		en = inggris
		nl = belanda
	*/
	var bahasa = "id";
	var container = null;
	var containerSize = "default";
	var showSplash = true;
	var resetStorgeData = false;
	
	var run = true;
	var update = true;
	
	this.setLanguage = function(s){
		bahasa = s||"id"
	}
	this.resetStorge = function(b){
		resetStorgeData = b;
	}
	this.showLoading = function(b){
		showSplash = b;
	}
	this.setContainerSize = function(s){
		containerSize = s||"default"
	}	
	this.start = function(containerName,size) {
		container = document.getElementById(containerName);
		containerSize = size||"default";		
		
		var splash = document.createElement("div");
			container.appendChild(splash);
		
		if(showSplash){
			splash.style.position = "absolute";
			splash.style.width = "100%"
			splash.style.textAlign = "center"
			splash.style.fontSize = "xx-large";
			splash.style.top = "50%";
			splash.innerHTML = "Loading 0%"
		}
		
        images = images||{};       
		
		//----resource library
		var jsNames = new Array();
			jsNames.push({name:"lib/createjs-2015.11.26.min.js"});
			jsNames.push({name:"data/words.json"});
			jsNames.push({name:"js/utility.js"});
			jsNames.push({name:"js/keyboard.js"});
			jsNames.push({name:"js/player.js"});
			jsNames.push({name:"js/enemy.js"});
			jsNames.push({name:"js/bullet.js"});
		//--resource image and sound
        var manifest = [
        	{src:"images/bg.jpg", id:"bg"},
        ];
		
		var totalResource = jsNames.length;
		if(jsNames.length==0){
			loadImage();
		}else{
			includeJs(0);
		}			
		function includeJs(n) {
			var jsFilePath = jsNames[n].name;			
			var collect,js,i;		
			collect = document.getElementsByTagName("script");
			for(i=0;i<collect.length;i++){
				if(jsFilePath==collect[i].src) return jsLoad_callback(n);
			}
			js = document.createElement("script");
			js.src = jsFilePath;
			js.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(js);
			js.addEventListener("load",function(e){
				jsLoad_callback(n);
			}, false);
		}
		function jsLoad_callback(n) {
			totalResource--
			if(showSplash){
				var ttl = jsNames.length
				splash.innerHTML = "Loading "+Math.round((ttl-totalResource)/ttl*100)+"%"
			}
			if (totalResource==0) {
				loadImage();
			}else{
				includeJs(n+1);
			}
		}
		
		function loadImage(){
			totalResource = manifest.length;
			var arr = manifest
			if(arr.length>0){
				for(var i=0;i<arr.length;i++){
					var src = arr[i].src;
					var id = arr[i].id;					
					var el = src.indexOf(".") == -1 ? src.length : src.indexOf(".");
					var ext = src.substr(el+1,src.length);
					switch(ext){
						case"jpeg":case"jpg":case"gif":case"png":case"webp":case"bmp":
							var gmbr = new Image();		
							gmbr.addEventListener("load",eventImageLoaded, false);
							gmbr.src = src;
							images[id] = gmbr;
						break;
						case"ogg":case"mp3":case"webm":
							totalResource--		
						break;
						case"mp4":case"webm":case"ts":
							totalResource--		
						break;
						default:
							totalResource--
					}
				}
			}else{
				completeLoad(null);
			}
		}

		function eventImageLoaded() {
			totalResource--		
			if(showSplash){
				var ttl = manifest.length
				splash.innerHTML = "Loading "+Math.round((ttl-totalResource)/ttl*100)+"%"
			}
			if(totalResource==0){
				completeLoad(null);
			}
		}
		
		function completeLoad(e){
			container.removeChild(splash);
			
			canvas = document.createElement("canvas");
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			canvas.style.position = "relative";		
			container.appendChild(canvas);
			
			stage = new createjs.Stage(canvas);
			stage.enableMouseOver(10);
			stage.mouseMoveOutside = true;
			createjs.Touch.enable(stage);	
			
			ctx = canvas.getContext("2d");
			G_CONTEXT = ctx;
			
			setSize([canvas],[ctx]);
			stage.scaleX = xScale;
			stage.scaleY = yScale;
		
			window.addEventListener("resize",function(e){
				setSize([canvas],[ctx]);
				stage.scaleX = xScale;
				stage.scaleY = yScale;
				update = true;	
			},false);
			
			ready();
		}
	};
	
    function setSize(canvas,context) {
		var size = containerSize;
		switch (size) {
			case "":
			case "default":
				container.style.width = canvasWidth + "px";
				container.style.height = canvasHeight + "px";
				xScale = 1; yScale = 1;
				for (var i=0; i<canvas.length; i++) {
					canvas[i].width=canvasWidth;
					canvas[i].height=canvasHeight;
					canvas[i].style.left = canvas[i].style.left+"px";
					canvas[i].style.top = canvas[i].style.top+"px";
				}
				break;
			case "auto":
				var ws = container.offsetWidth/canvasWidth;
				var hs = container.offsetHeight/canvasHeight;
				xScale = Math.min(ws,hs);
				yScale = xScale;
				var cw = container.offsetWidth;
				var ch = container.offsetHeight;
				for (var i=0; i<canvas.length; i++) {
					canvas[i].width=canvasWidth*xScale;
					canvas[i].height=canvasHeight*yScale;
					context[i].scale(xScale, yScale);
					canvas[i].style.left= ((cw-canvasWidth*xScale)/2)+"px";
					canvas[i].style.top=((ch-canvasHeight*yScale)/2)+"px";
				}
				break;
			case "fit":
				xScale = container.offsetWidth/canvasWidth;
				yScale = container.offsetHeight/canvasHeight;
				for (var i=0; i<canvas.length; i++) {
					canvas[i].width=container.offsetWidth;
					canvas[i].height=container.offsetHeight;
					context[i].scale(xScale, yScale);
					canvas[i].style.left= ((container.offsetWidth-canvasWidth*xScale)/2)+"px";
					canvas[i].style.top=((container.offsetHeight-canvasHeight*yScale)/2)+"px";
				}
				break;
			case "fitwidth":
				xScale = container.offsetWidth/canvasWidth;
				yScale = xScale;
				container.style.height = (canvasHeight*yScale) + "px";
				for (var i=0; i<canvas.length; i++) {
					canvas[i].width=container.offsetWidth;
					canvas[i].height=canvasHeight*yScale;
					context[i].scale(xScale, yScale);
					canvas[i].style.left= ((container.offsetWidth-canvasWidth*xScale)/2)+"px";
					canvas[i].style.top=((container.offsetHeight-canvasHeight*yScale)/2)+"px";
				}
				break;
			case "fitheight":
				yScale = container.offsetHeight/canvasHeight;
				xScale = yScale;
				container.style.width = (canvasWidth*xScale) + "px";
				for (var i=0; i<canvas.length; i++) {
					canvas[i].height=container.offsetHeight;
					canvas[i].width=canvasWidth*xScale;
					context[i].scale(xScale, yScale);
					canvas[i].style.left= ((container.offsetWidth-canvasWidth*xScale)/2)+"px";
					canvas[i].style.top=((container.offsetHeight-canvasHeight*yScale)/2)+"px";
				}
				break;
		}
		try {setInteractiveMark(container);} catch(err){};
	}

	function createSuara(s){
		var a = document.createElement('audio');
		a.innerHTML = '<source src="sounds/'+s+'.ogg" type="audio/ogg">'+'<source src="sounds/'+s+'.aac" type="audio/mpeg">';
		return a;
	}

	function classSuara(s){// class suara
		var a = document.createElement('audio');
		a.innerHTML = ""
		a.innerHTML += '<source src="sounds/'+s+'.mp3" type="audio/mpeg">';
		a.innerHTML += '<source src="sounds/'+s+'.ogg" type="audio/ogg">'
		//a.innerHTML += '<source src="sounds/'+s+'.aac" type="audio/mpeg">';		
		this.play = function(f){
			//a.currentTime=0;
			a.play();
			f!=null&&a.addEventListener("ended",f);
		}
		this.pause = function(){
			a.pause();
		}
		this.setVolume = function(n){
			a.volume = n;
		}
		this.setTime = function(n){
			//a.currentTime = n;
		}
	}

	function createSuara(s,f){// jalankan suara
		var a = document.createElement('audio');
		a.innerHTML += '<source src="sounds/'+s+'.mp3" type="audio/mpeg">';
		a.innerHTML += '<source src="sounds/'+s+'.ogg" type="audio/ogg">';
		a.play();
		f!=null&&a.addEventListener("ended",f);
	}

    function ready() {
		var arrBahasa = [];
		switch(bahasa){
			case "id":
				arrBahasa[0] = "";
				break;
			case "en":
				arrBahasa[0] = "";
				break;
		}

		// helper enumeration
		STATE = {
			DEFAULT:0,
			GAMEPLAY:1,
			END:2,
		}

		// helper functions

		// helper constants

		// helper/global variables
		var _soundLoaded = false;

		var _words = wordLists;

		var _state = -1;
		var _isPaused = false;

		var _keyboard;

		var _enemies = [];
		var _player;

		var _level = 1;

		// define classes
		// function createEmptyClass(x,y) {
		// 	createjs.Container.call(this);
		// 	this.x = x;
		// 	this.y = y;
		// }
		// createEmptyClass.prototype = new createjs.Container;

		// function createTextSet(x,y) {
		// 	createjs.Container.call(this);
		// 	this.x = x;
		// 	this.y = y;

		// 	var px = 30;
		// 	var py = 50;

		// 	var label1 = new createHtmlText(canvasWidth/2, py);
		// 		label1.setParam("serif", 28, "#000000", "center");
		// 		label1.setText(arrBahasa[0]);
		// 	this.addChild(label1);
		// }
		// createTextSet.prototype = new createjs.Container;

		// function createButtonSimple(x,y) {
		// 	createjs.Container.call(this);
		// 	this.x = x;
		// 	this.y = y;

		// 	var w = 200;
		// 	var h = 70;

		// 	var button = new createjs.Bitmap(images.btnSoalBaru);
		// 		button.sourceRect = {x:0,y:0,width:w,height:h};
		// 		button.regX = w/2;
		// 		button.regY = h/2;
		// 	this.addChild(button);

		// 	this.hit = new createjs.Shape();
		// 	this.hit.graphics.beginFill("#ffffff").drawRect(-w/2,-h/2,w,h);
		// 	this.hit.alpha = 0.01;
		// 	this.hit.cursor = "pointer";
		// 	this.addChild(this.hit);

		// 	this.mouseover = function() {
		// 		button.sourceRect = {x:w,y:0,width:w,height:h};
		// 	}

		// 	this.mouseout = function() {
		// 		button.sourceRect = {x:0,y:0,width:w,height:h};
		// 	}

		// 	this.mousedown = function() {
		// 		button.sourceRect = {x:w*2,y:0,width:w,height:h};
		// 	}

		// 	this.pressup = function() {
		// 		button.sourceRect = {x:0,y:0,width:w,height:h};
		// 	}
		// }
		// createButtonSimple.prototype = new createjs.Container;

		// define functions

		/**
			function to set 'state' and adjust game according to the current 'state'.
		*/
		function setState(state) {
			if (_state != state) {
				_state = state;
				if (state == STATE.DEFAULT) {
					//
				}
			}
		}

		/**
			function to generate enemies for each level
		*/
		function generateLevel() {
			var eCount = 4 + Math.floor(_level * 1.2);
			var maxT1 = Math.floor(_level / 3);
			var maxT2 = Math.floor(_level / 6);
			var t1Count = 0;
			var t2Count = 0;
			_enemies = [];
			for (var i = 0; i < eCount; i++) {
				var rnd = randomNum(0, _words.length, true, false);
				var word = _words[rnd];
				var type = ENEMY_TYPE.BASIC;
				if (_level >= 6 && word.length >= 8 && t2Count < maxT2) {
					type = ENEMY_TYPE.TIER_2;
					t2Count++;
				} else if (_level >= 3 && word.length >= 6 && t1Count < maxT1) {
					type = ENEMY_TYPE.TIER_1;
					t1Count++;
				}
				var speed = 10 + Math.floor(_level * 0.8);
				var e = new createEnemy(0,0,type,speed,word);
				_enemies[i] = e;
				console.log("(" + e.type + ")" + e.word);
			}
		}

		/**
			function to seek for target to attack
		*/
		function seekTarget(letter) {
			var i = 0;
			var found = false;
			while (i < _enemies.length && !found) {
				if (!_enemies[i].dead && _enemies[i].word[0] == letter) {
					_player.target = i;
					found = true;
				} else {
					i++;
				}
			}
		}

		/**
			function to attack enemy
		*/
		function doAttack(letter) {
			if (_player.target == -1) { // still not found?
				console.log("MISSED!");
			} else {
				var target = _enemies[_player.target];
				if (target.word[target.damage] == letter) {
					target.damage++;
					console.log("attacking enemy-" + _player.target + " (" + target.type + "), letter: " + letter + ", damage: " + target.damage + " remaining word: " + target.word.substring(target.damage));

					if (target.damage == target.word.length) {
						target.dead = true;
						_player.target = -1;
						console.log("TARGET DEAD!!");
						for (var i = 0; i < _enemies.length; i++) {
							if (!_enemies[i].dead) {
								console.log("(" + _enemies[i].type + ")" + _enemies[i].word);
							}
						}
					}
				} else {
					console.log("MISSED!");
				}
			}
		}

		/**
			function to check if all enemy in the current level is cleared
		*/
		function isLevelCleared() {
			var i = 0;
			var clear = true;
			while (i < _enemies.length && clear) {
				if (!_enemies[i].dead) {
					clear = false;
				} else {
					i++;
				}
			}
			return clear;
		}

		/**
			action sequence for key down event
		*/
		function keyDown(letter) {
			// if no target yet, seek for target
			if (_player.target == -1) {
				seekTarget(letter);
			}

			// attack the enemy
			doAttack(letter);

			// check level clear, if clear advance to the next level
			if (isLevelCleared()) {
				console.log("LEVEL-" + _level + " CLEARED! TO NEXT LEVEL!");
				_level++;
				generateLevel();
			}
		}

		// objects initiations
		var bg = new createjs.Bitmap(images.bg);

		_player = new createPlayer(0,0);

		_keyboard = new createKeyboardSet(0,936);
		// var textSet = new createTextSet(0,0);

		// var buttonSimple = new createButtonSimple(320,560);

        // var benarSound = new classSuara("Benar");
        
		// add objects to stage
		stage.addChild(bg);
		stage.addChild(_player);
		stage.addChild(_keyboard);
		// stage.addChild(textSet);
		// stage.addChild(buttonSimple);

		// event handler
		window.addEventListener('keydown', function(e) {
			var code = e.keyCode;
			if ((code >= 65 && code <= 90)
				|| (code >= 97 && code <= 122)) {
				var letter = String.fromCharCode(code).toLowerCase();
				keyDown(letter);				
			}
		});

		// function keyboardMouseOver(i) {
		// 	return function(e) {
		// 		_keyboard.mouseover(i);
		// 		update = true;
		// 	}
		// }

		// function keyboardMouseOut(i) {
		// 	return function(e) {
		// 		_keyboard.mouseout(i);
		// 		update = true;
		// 	}
		// }

		function keyboardMouseDown(i) {
			return function(e) {
				_keyboard.mousedown(i);
				update = true;
			}
		}

		function keyboardPressUp(i) {
			return function(e) {
				var p = _keyboard.hits[i].globalToLocal(e.stageX, e.stageY);
				_keyboard.pressup(i);
				if (_keyboard.hits[i].hitTest(p.x, p.y)) {
					var letter = KEYBOARD_KEYS[i].toLowerCase();
					keyDown(letter);
				}
				update = true;
			}
		}

		// function keyboardClick(i) {
		// 	return function(e) {
		// 		klikSound.play();
		// 		if (!_soundLoaded) {
		// 			benarSound.fakeplay();
		// 			_soundLoaded = true;
		// 		}
		// 		update = true;
		// 	}
		// }

		for (var i = 0; i < _keyboard.hits.length; i++) {
		// 	_keyboard.hits[i].on("mouseover", keyboardMouseOver(i));
		// 	_keyboard.hits[i].on("mouseout", keyboardMouseOut(i));
			_keyboard.hits[i].on("mousedown", keyboardMouseDown(i));
			_keyboard.hits[i].on("pressup", keyboardPressUp(i));
		// 	_keyboard.hits[i].on("click", keyboardClick(i));
		}

		// buttonSimple.hit.on("mouseover", function(e) {
		// 	buttonSimple.mouseover();
		// 	update = true;
		// });

		// buttonSimple.hit.on("mouseout", function(e) {
		// 	buttonSimple.mouseout();
		// 	update = true;
		// });

		// buttonSimple.hit.on("mousedown", function(e) {
		// 	buttonSimple.mousedown();
		// 	update = true;
		// });

		// buttonSimple.hit.on("pressup", function(e) {
		// 	buttonSimple.pressup();
		// 	var p = buttonSimple.hit.globalToLocal(e.stageX, e.stageY);
		// 	if (buttonSimple.hit.hitTest(p.x, p.y)) {
		// 		//
		// 	}
		// 	update = true;
		// });

		// buttonSimple.hit.on("click", function(e) {
		// 	klikSound.play();
		// 	if (!_soundLoaded){
		// 		triggerSound();
		// 		_soundLoaded = true;
		// 	}
		// 	update = true;
		// });

		// init and setup
    	setState(STATE.DEFAULT);
		generateLevel();

		// start the game loop
		var startTime = new Date().getTime();

        createjs.Ticker.setFPS(30);
		stage.update();
		
        createjs.Ticker.addEventListener("tick", function(){
			if(update || run){
				update = false;
				
				if(run){
					var t = (new Date().getTime()-startTime)/1000;
					startTime = new Date().getTime();
				}
				
				stage.update();
			}
        });
    }
}
