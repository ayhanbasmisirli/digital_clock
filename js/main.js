function ready (){
	
	
	var clock1 = new Clock('clock_element');
}

function Clock(id){
       
 	
 	this.updateClock = function(){
 		var date = new Date()
		var element = document.getElementById(id);
		element.innerHTML =  this.zerocorrect(date.getHours())+":"+this.zerocorrect(date.getMinutes())+":"+this.zerocorrect(date.getSeconds())
		console.log(this);
 	};

 	this.zerocorrect =function(val){
 		if(val<10) val = "0"+val;
		return val;
	};
 	
 	var that = this; //function inside the set interval doesnt have access the object refering so keep the object on we refer variable to 
 	setInterval(function(){that.updateClock()}, 1000);
 	this.updateClock();
 	
}


window.onload = ready