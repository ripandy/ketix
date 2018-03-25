var CANVAS_WIDTH = 720;
var CANVAS_HEIGHT = 1280;
var G_CONTEXT;
// var images;

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
		
		var ltx;
		if(showSplash){
			ltx = new createjs.Text("Loading 0%", "40pt sans-serif", "#000000");
			stage.addChild(ltx);
		}
		
        images = images||{}; 
		
		//----resource library
		var jsNames = new Array();
			jsNames.push({name:"data/words.json"});
			jsNames.push({name:"js/utility.js"});
			jsNames.push({name:"js/sound.js"});
			jsNames.push({name:"js/mainmenu.js"});
			jsNames.push({name:"js/gameover.js"});
			jsNames.push({name:"js/keyboard.js"});
			jsNames.push({name:"js/hud.js"});
			jsNames.push({name:"js/player.js"});
			jsNames.push({name:"js/enemy.js"});
			jsNames.push({name:"js/bullet.js"});
		//--resource image and sound
        var manifest = [
        	{src:"images/bg.png", id:"bg"},
        	{src:"images/bebek.png", id:"bebek"},
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
				ltx.text = "Loading "+Math.round((ttl-totalResource)/ttl*100)+"%"
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
			totalResource--;		
			if(showSplash){
				var ttl = manifest.length
				ltx.text = "Loading "+Math.round((ttl-totalResource)/ttl*100)+"%"
			}
			if(totalResource==0){
				completeLoad(null);
			}
		}
		
		function completeLoad(e){
			stage.removeChild(ltx);
			
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
		var KEY_TIMEOUT = 0.2;

		// helper/global variables
		var _soundLoaded = false;

		var _words = wordLists;

		var _state = -1;
		var _paused = false;

		var _keyBuffer = [];
		var _keyboard;

		var _mainMenu;
		var _hud;
		var _gameover;
		var _player;
		var _bullets = [];
		var _enemies = [];

		var _level = 10;
		var _score = 0;

		// define functions

		/**
			function to set 'state' and adjust game according to the current 'state'.
		*/
		function setState(state) {
			if (_state != state) {
				_state = state;
				if (state == STATE.DEFAULT) {
					_mainMenu.visible = true;
					_hud.visible = false;
					_keyboard.visible = false;
					for (var i = 0; i < _enemies.length; i++) {
						_enemies[i].visible = false;
					}
					for (var i = 0; i < _bullets.length; i++) {
						_bullets[i].visible = false;
					}
					_gameover.visible = false;
				} else if (state == STATE.GAMEPLAY) {
					_keyBuffer = [];
					_level = 1;
					_score = 0;
					generateLevel();

					_mainMenu.visible = false;
					_hud.visible = true;
					_keyboard.visible = true;

					setPaused(false);
					_gameover.setScore(0);
				} else if (state == STATE.END) {
					_gameover.setScore(_score);
					_gameover.visible = true;
				}
			}
		}

		function setPaused(pause) {
			_paused = pause;
			_hud.setPaused(pause);
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
				var speed = 10 + Math.floor(_level * 2) + Math.floor(randomNum(0, _level, true, true));

				var px = randomNum(50,canvasWidth-50,true,true);
				var py = -40 - ((randomNum(0,20,true,true)) * (i + 1));

				if (_enemies.length <= i) {
					var e = new createEnemy(px,py,type,speed,word);
					stage.addChild(e);
					stage.setChildIndex(e,1);
					_enemies.push(e);
				} else {
					_enemies[i].init(px,py,type,speed,word);
				}
				_enemies[i].setTargetPos(_player.x, _player.y);

				console.log("(" + type + ")" + word);
			}

			_player.target = -1;
			_keyBuffer = [];
		}

		/**
			function to seek for target to attack
		*/
		function seekTarget(letter) {
			// seek for first letter
			var tArr = [];
			for (var i = 0; i < _enemies.length; i++) {
				if (!_enemies[i].dead
					&& _enemies[i].shot == 0
					&& _enemies[i].damage == 0
					&& _enemies[i].word[0] == letter
					&& _enemies[i].y > -50) {
					tArr.push(i);
				}
			}

			// seek for target closest to player
			var maxY = -999;
			var mdx = -1;
			for (var i = 0; i < tArr.length; i++) {
				if (_enemies[tArr[i]].y > maxY) {
					mdx = i;
					maxY = _enemies[tArr[i]].y;
				}
			}
			if (mdx != -1) {
				_player.target = tArr[mdx];
			} else {
				_player.target = -1;
			}
		}

		/**
			function to attack enemy
		*/
		function doAttack(letter) {
			if (_player.target != -1) {
				var target = _enemies[_player.target];
				if (target.word[target.shot] == letter) {
					_player.attack(target.x, target.y);

					var bdx = 0;
					var found = false;
					while (bdx < _bullets.length && !found) {
						if (!_bullets[bdx].visible) {
							found = true;
						} else {
							bdx++;
						}
					}

					if (!found) {
						var b = new createBullet(_player.x, _player.y);
						stage.addChild(b);
						stage.setChildIndex(b,1);
						_bullets.push(b);
						bdx = _bullets.length-1;
					}
					_bullets[bdx].shoot(_player.target, _player.x, _player.y, target.x, target.y);
					target.shot++;
					if (target.shot >= target.word.length) {
						_player.target = -1;
						console.log("here!");
					}
				}
			}
		}

		function enemyHit(bdx, edx) {
			_enemies[edx].damaged();
			_bullets[bdx].collided();
			_score += _level;
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
		function attackSequence(letter) {
			// if no target yet, seek for target
			if (_player.target == -1) {
				seekTarget(letter);
			}

			// attack the enemy
			doAttack(letter);
		}

		// objects initiations
		var bg = new createjs.Bitmap(images.bg);

		_player = new createPlayer(canvasWidth/2, 800, images);

		_keyboard = new createKeyboardSet(0,CANVAS_HEIGHT);

		_hud = new createHUD(0,0);
		_mainMenu = new createMainMenu(0,0);
		_gameover = new createGameOver(0,0);
        
		// add objects to stage
		stage.addChild(bg);
		stage.addChild(_player);
		stage.addChild(_hud);
		stage.addChild(_keyboard);
		stage.addChild(_mainMenu);
		stage.addChild(_gameover);

		// event handler
		window.addEventListener('keydown', function(e) {
			var code = e.keyCode;
			if ((code >= 65 && code <= 90)
				|| (code >= 97 && code <= 122)) {
				var letter = String.fromCharCode(code).toLowerCase();
				_keyBuffer.push(letter);
			}
		});

		function keyboardMouseDown(i) {
			return function(e) {
				_keyboard.mousedown(i);
				update = true;
			}
		}

		function keyboardClick(i) {
			return function(e) {
				var letter = KEYBOARD_KEYS[i].toLowerCase();
				_keyBuffer.push(letter);
				update = true;
			}
		}

		for (var i = 0; i < _keyboard.hits.length; i++) {
			_keyboard.hits[i].on("mousedown", keyboardMouseDown(i));
			_keyboard.hits[i].on("click", keyboardClick(i));
		}

		_mainMenu.pHit.on("click", function(e) {
			setState(STATE.GAMEPLAY);
			update = true;
		});

		_hud.pauseBtn.on("click", function(e) {
			setPaused(!_paused);
			update = true;
		});

		_hud.rHit.on("click", function(e) {
			setPaused(false);
			update = true;
		});

		_hud.mHit.on("click", function(e) {
			setState(STATE.DEFAULT);
			update = true;
		});

		_gameover.hit.on("click", function(e) {
			setState(STATE.DEFAULT);
			update = true;
		});

		// init and setup
    	setState(STATE.DEFAULT);

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

					if (_state == STATE.GAMEPLAY && !_paused) {
						// update attack sequence
						if (_keyBuffer.length > 0) {
							var letter = _keyBuffer.shift();
							attackSequence(letter);
						}

						// update player
						_player.updateSet(t);

						// update enemies
						for (var i = 0; i < _enemies.length; i++) {
							_enemies[i].updateSet(t);

							var p = _player.hits.localToLocal(0,0,_enemies[i].hits);
							if (_enemies[i].hits.hitTest(p.x,p.y)
								// && !_enemies[i].dead
								&& _enemies[i].visible) {
								setState(STATE.END);
							}
						}

						// update bullets
						for (var i = 0; i < _bullets.length; i++) {
							var b = _bullets[i];
							b.updateSet(t);

							if (b.target != -1) {
								var e = _enemies[b.target];
								var p = e.hits.localToLocal(0, 0, b.hits);
								if (b.hits.hitTest(p.x, p.y)) {
									enemyHit(i,b.target);
								}
							}
						}

						// check level clear, if clear advance to the next level
						if (isLevelCleared()) {
							console.log("LEVEL-" + _level + " CLEARED! SCORE: " + _score);
							_level++;
							generateLevel();
						}
					}
				}
				
				stage.update();
			}
        });
    }
}
