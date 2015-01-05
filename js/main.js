function ready (){
	
	setInterval(updateClock, 1000);
	updateClock();
	
}
function zerocorrect(val){
	if(val<10) {
		return "0"+val;

	}else{
		return val;
	}
}
function updateClock(){
	var clock = new Date()
	var element = document.getElementById('clock');
	element.innerHTML = zerocorrect(clock.getHours())+":"+zerocorrect(clock.getMinutes())+":"+zerocorrect(clock.getSeconds())
}
window.onload = ready