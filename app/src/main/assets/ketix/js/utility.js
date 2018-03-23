// utility class to create html-like texts
function createHtmlText(x,y){
	createjs.Container.call(this);
	this.x = x;
	this.y = y;
	
	var htmlStyle = [];
	var curText = ""
	
	this.textAlign = "left"
	this.lineSpacing = 30;
	
	this.defaultColor = "#FFFFFF"
	this.defaultFont = "Arial";
	this.defaultSize = 22;
	
	this.setText = function(str){
		curText = str;
		htmlStyle = readHtmlStyle(G_CONTEXT,str,this.defaultColor,this.defaultFont,this.defaultSize);
		
		var i,u,w,nx,nar,txt,ff;
		
		while(this.numChildren>0){
			this.removeChildAt(0);
		}
						
		var arr = htmlStyle[0];
		var arW = htmlStyle[1];
		
		for(u=0; u<arr.length; u++){
			nar = arr[u];					
			nx = 0;
			if(this.textAlign=="center"){
				nx = -arW[u]/2;
			}else if(this.textAlign=="right"){
				nx = -arW[u];
			}
				
			w=0;
			for(i=0;i<nar.length; i++){
				ff = AdaptiveFontSize.fix(nar[i][0]);
				txt = new createjs.Text(nar[i][1], ff, nar[i][2]);
				txt.textBaseline = nar[i][3];
				txt.x = nx+w;
				txt.y = u*this.lineSpacing;
				
				G_CONTEXT.save();
				G_CONTEXT.font = ff;
				w += G_CONTEXT.measureText(nar[i][1]).width;
				G_CONTEXT.restore();
				
				this.addChild(txt);
			}			
		}		
	}
	this.addText = function(str){
		curText += str;
		this.setText(curText);
	}
		
	function readHtmlStyle(_ctx,str,dc,tf,dz,ir){
		var txtColor = dc;
		var u,i,nar,w,n,t,shrt;
		var typeFont = tf;
		var fb=""
		var fi=""
		var fz = dz+"px";
		var clr=txtColor;
		var f=""
		var oldC = [];
		var oldS = [];
		var bl="middle";
		
		var arr = [];arr.push([])
		var no = arr.length-1;
		
		function _fontColor(str){
			var n1 = str.search("<color");
			var n2 = -1;
			var c = "";
			var s = "";
			if(n1 != -1){
				var nstr = str.substr(n1,str.length);
				n2 = nstr.search(">");	
				s = nstr.substr(0,n2+1);
				var v1,v2;
				v1 = s.search("#");
				if(v1 !=-1){
					v2 = s.search(">");
					c = s.substr(v1,v2-v1);
					return [n1,s,function(){oldC.push(clr);clr=c;}]
				}
			}
			return [-1,"",function(){}]
		}
		function _fontSize(str){
			var n1 = str.search("<size");
			var n2 = -1;
			var c = "";
			var s = "";
			if(n1 != -1){
				var nstr = str.substr(n1,str.length);
				n2 = nstr.search(">");
				s = nstr.substr(0,n2+1);
				var v1,v2;
				v1 = s.search("=");
				if(v1 !=-1){
					v2 = s.search(">");
					c = s.substr(v1 + 1,v2-(v1 + 1)) + "px";
					return [n1,s,function(){oldS.push(fz);fz=c;}]
				}
			}
			return [-1,"",function(){}]
		}
		
		while(true){					
			shrt = [];
			shrt.push([str.search("<b>"),"<b>",function(){fb="bold ";}])
			shrt.push([str.search("<i>"),"<i>",function(){fi="italic ";}])
			shrt.push([str.search("<br>"),"<br>",function(){arr.push([]);no++;}])
			shrt.push([str.search("<sup>"),"<sup>",function(){fz=Math.floor(dz*0.6)+"px"; bl="alphabetic";}])
			shrt.push([str.search("<sub>"),"<sub>",function(){fz=Math.floor(dz*0.6)+"px"; bl="hanging"}])
			shrt.push([str.search("</b>"),"</b>",function(){fb="";}])
			shrt.push([str.search("</i>"),"</i>",function(){fi="";}])
			shrt.push([str.search("</sup>"),"</sup>",function(){fz=dz+"px"; bl="middle"}])
			shrt.push([str.search("</sub>"),"</sub>",function(){fz=dz+"px"; bl="middle"}])
			shrt.push(_fontColor(str));
			shrt.push([str.search("</color>"),"</color>",function(){if(oldC.length>0){clr=oldC.pop();}}])
			shrt.push(_fontSize(str));
			shrt.push([str.search("</size>"),"</size>",function(){if(oldS.length>0){fz=oldS.pop()}}])
			
			shrt.sort(function(a,b){
				if (a[0] < b[0]) return -1;
				if (a[0] > b[0]) return 1;
				return 0;
			});
			
			for(i=0;i<shrt.length;i++){
				if(shrt[i][0]==-1){
					shrt.shift();
					i--
				}
			}
			if(shrt.length>0){
				n = shrt[0][0];
				t = shrt[0][1];
				f = fb+fi+fz+" "+typeFont;
				arr[no].push([f, str.substr(0,n),clr,bl]);					
				str = str.substr(n+t.length,str.length);
				shrt[0][2]();
			}else{
				f = fb+fi+fz+" "+typeFont;
				arr[no].push([f, str.substr(0,str.length),clr,bl]);	
				break
			}				
		}
		
		var arW=[];
		for(u=0;u<arr.length; u++){
			nar = arr[u];w=0;
			for(i=0;i<nar.length;i++){
				_ctx.save();
				_ctx.font = AdaptiveFontSize.fix(nar[i][0]);
				w += _ctx.measureText(nar[i][1]).width;
				_ctx.restore();	
			}
			arW.push(w);
		}
		return [arr,arW]
	}

	this.getText = function() {
		return curText;
	}

	this.resetText = function() {
		this.setText(curText);
	}

	this.setParam = function(defaultFont, defaultSize, defaultColor, textAlign) {
		var font = ((typeof defaultFont !== 'undefined') ? defaultFont : "Arial");
		var size = ((typeof defaultSize !== 'undefined') ? defaultSize : 22);
		var color = ((typeof defaultColor !== 'undefined') ? defaultColor : "#ffffff");
		var align = ((typeof textAlign !== 'undefined') ? textAlign : "left");
		this.defaultFont = font;
		this.defaultSize = size;
		this.defaultColor = color;
		this.textAlign = align;
	}
}
createHtmlText.prototype = new createjs.Container;

// function to read json file
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

// clamp values between min and max
function clamp(min, max, value) {
	return ( Math.max( min, Math.min(max, value) ) );
}

// ease functions
// t -> current time
// b -> start value
// c -> changes in value
// d -> duration
function easeInQuad(t, b, c, d){
	t /= d;
	return c*t*t + b;
}

function easeInCubic(t, b, c, d) {
	return c*(t/=d)*t*t + b;
}

function easeOutCubic(t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
}

function easeOutQuad(t, b, c, d){
	t /= d;
	return -c * t*(t-2) + b;
}

function easeLinear(t, b, c, d){
	return c*t/d + b;
}

// round 'num' to the maximum of 'decimals'
function roundNum(num, decimals) {
	var multiplier = Math.pow(10,decimals);
	return Math.round(num * multiplier) / multiplier;
}

// generate random number between 'min' and 'max'.
// 'rounded' (boolean) define wether the number is a round number or not
// 'inclusive' (boolean) define wether 'max' is inclusive or not
function randomNum(min, max, rounded, inclusive) {
	var inc = ((typeof inclusive !== 'undefined') ? inclusive : false);
	var round = ((typeof rounded !== 'undefined') ? rounded : true);
	if (round)
		return (min + Math.floor(Math.random() * ((max + (inc ? 1 : 0)) - min)));
	else
		return (min + Math.random() * ((max + (inc ? 1 : 0)) - min));
}

// shuffle an array 'a'
function shuffle(a) {
    var j, x, i;
    var arr = a;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

// wrap string 'str' with max character-per-line less than 'maxWidth'
function wordWrap(str, maxWidth) {
	var newLineStr = "\n"; done = false; res = '';
	if (str.length < maxWidth)
		done = true;
	while (!done) {
		found = false;
        // Inserts new line at first whitespace of the line
		for (i = maxWidth - 1; i >= 0; i--) {
			var white = new RegExp(/^\s$/);
			if (white.test(str.charAt(i).charAt(0))) {
				res = res + [str.slice(0, i), newLineStr].join('');
				str = str.slice(i + 1);
				found = true;
				break;
			}
		}
        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
        	res += [str.slice(0, maxWidth), newLineStr].join('');
        	str = str.slice(maxWidth);
        }

		if (str.length < maxWidth)
			done = true;
	};

	return res + str;
}

// convert radians to degrees
function toDegrees(angle) {
	return angle * (180 / Math.PI);
}

// convert degrees to radians
function toRadians(angle) {
	return angle * (Math.PI / 180);
}
