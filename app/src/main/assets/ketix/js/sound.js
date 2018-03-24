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
	this.stop = function() {
		a.pause();
		a.currentTime = 0;
	}
	this.setVolume = function(n){
		a.volume = n;
	}
	this.setTime = function(n){
		a.currentTime = n;
	}
}

function createSuara(s,f){// jalankan suara
	var a = document.createElement('audio');
	a.innerHTML += '<source src="sounds/'+s+'.mp3" type="audio/mpeg">';
	a.innerHTML += '<source src="sounds/'+s+'.ogg" type="audio/ogg">';
	a.play();
	f!=null&&a.addEventListener("ended",f);
}
