function ready (){
	
	
	var clock1 = createClock('clock_element');
}

function createClock(id){
         var c = new Object();
 	
 	c.updateClock = function(){
 		var date = new Date()
		var element = document.getElementById(id);
		element.innerHTML =  this.zerocorrect(date.getHours())+":"+this.zerocorrect(date.getMinutes())+":"+this.zerocorrect(date.getSeconds())
		console.log(this);
 	};

 	c.zerocorrect =function(val){
 		if(val<10) val = "0"+val;
		return val;
	};
 	
 	setInterval(function(){c.updateClock()}, 1000);
 	c.updateClock();
 	return c;
}


window.onload = ready