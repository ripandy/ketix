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

// collision detector
// function isCollide(b1,b2) {
//     if (b1.x >= b2.x + b2.width || b1.x + b1.width <= b2.x || b1.y >= b2.y + b2.height || b1.y + b1.height <= b2.y ) return false;
//     return true;
// }
